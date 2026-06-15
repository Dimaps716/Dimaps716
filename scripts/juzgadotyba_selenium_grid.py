"""
Juzgados Tyba scraper using Selenium Grid.

Converted from Playwright version to use Selenium Grid for browser automation.
"""

import logging
import random
import time
from typing import Optional

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common.exceptions import (
    NoSuchElementException,
    TimeoutException,
    WebDriverException,
)
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select, WebDriverWait
from rq.timeouts import JobTimeoutException

from app.cedula.fuentes.juzgado_tyba.juzgadotyba_data import TybaData
from app.cedula.fuentes.juzgado_tyba.juzgadotyba_request import TybaRequest
from app.cedula.fuentes.juzgado_tyba.juzgadotyba_utils import tyba_utils
from app.services.services_proxies import ServicesProxies


BASE_URL: str = "https://procesojudicial.ramajudicial.gov.co/"
WEBSITE_URL: str = f"{BASE_URL}justicia21/Administracion/Ciudadanos/frmConsulta.aspx"
SELENIUM_GRID_URL: str = "http://localhost:4454/wd/hub"


def close_browser(driver: Optional[WebDriver]) -> None:
    """Safely close the browser driver."""
    if driver:
        try:
            driver.quit()
        except Exception:
            pass


def create_firefox_driver() -> WebDriver:
    """
    Create a Firefox WebDriver instance connected to Selenium Grid.
    
    Firefox is used because it has better reCAPTCHA scores than Chrome/Edge.
    
    Returns:
        WebDriver instance connected to Selenium Grid
    """
    options = FirefoxOptions()
    options.set_preference("dom.webdriver.enabled", False)
    options.set_preference("useAutomationExtension", False)
    
    driver = webdriver.Remote(
        command_executor=SELENIUM_GRID_URL,
        options=options
    )
    driver.set_page_load_timeout(30)
    driver.implicitly_wait(5)
    
    return driver


def get_view_state(html_text: str) -> Optional[str]:
    """
    Extract __VIEWSTATE value from HTML.
    
    Args:
        html_text: HTML content as string
        
    Returns:
        ViewState value or None if not found
    """
    logging.info("Extracting __VIEWSTATE value")
    soup = BeautifulSoup(html_text, "html.parser")
    viewstate_input = soup.find("input", {"id": "__VIEWSTATE"})
    if viewstate_input:
        return viewstate_input.get("value")
    return None


def get_event_validation(html_text: str) -> Optional[str]:
    """
    Extract __EVENTVALIDATION value from HTML.
    
    Args:
        html_text: HTML content as string
        
    Returns:
        EventValidation value or None if not found
    """
    logging.info("Extracting __EVENTVALIDATION value")
    soup = BeautifulSoup(html_text, "html.parser")
    event_validation_input = soup.find("input", {"id": "__EVENTVALIDATION"})
    if event_validation_input:
        return event_validation_input.get("value")
    return None


def get_ip(driver: WebDriver) -> None:
    """Log the current IP address."""
    try:
        driver.get("https://ifconfig.me/ip")
        ip_text = driver.find_element(By.TAG_NAME, "body").text
        logging.info(f"IP: {ip_text}")
    except Exception:
        pass


def input_form_data(driver: WebDriver, document_type: str, cc: str) -> bool:
    """
    Fill out the consultation form.
    
    Args:
        driver: WebDriver instance
        document_type: Document type to select
        cc: Document number to input
        
    Returns:
        True if successful, False otherwise
    """
    try:
        wait = WebDriverWait(driver, 10)
        
        # Click on "Ciudadano" option
        logging.info("Clicking on 'Ciudadano' option")
        ciudadano_link = wait.until(
            EC.element_to_be_clickable((By.LINK_TEXT, "Ciudadano"))
        )
        ciudadano_link.click()
        
        # Select document type
        logging.info(f"Selecting document type: {document_type}")
        tipo_doc_select = wait.until(
            EC.presence_of_element_located((By.ID, "MainContent_ddlTipoDocumento"))
        )
        select = Select(tipo_doc_select)
        select.select_by_value(document_type)
        
        # Click on document number field
        logging.info("Clicking on document number field")
        num_identificacion = wait.until(
            EC.element_to_be_clickable((By.ID, "MainContent_txtNumeroIdentificacion"))
        )
        num_identificacion.click()
        
        # Type document number character by character with random delays
        logging.info(f"Typing document number: {cc}")
        for char in str(cc):
            num_identificacion.send_keys(char)
            tyba_utils.random_wait(50, 150)
        
        return True
        
    except Exception as e:
        logging.warning(f"Error in input_form_data: {e}")
        return False


def press_consult_button(driver: WebDriver) -> bool:
    """
    Click the consult button.
    
    Args:
        driver: WebDriver instance
        
    Returns:
        True if successful, False otherwise
    """
    logging.info("Clicking consult button")
    try:
        wait = WebDriverWait(driver, 10)
        consult_button = wait.until(
            EC.element_to_be_clickable((By.NAME, "ctl00$MainContent$btnConsultar"))
        )
        consult_button.click()
        return True
    except Exception as e:
        logging.warning(f"Error clicking consult button: {e}")
        return False


def wait_for_informative_message(driver: WebDriver, timeout: int) -> Optional[str]:
    """
    Wait for and return the informative message element.
    
    Args:
        driver: WebDriver instance
        timeout: Maximum wait time in seconds
        
    Returns:
        Message text or None if not found
    """
    try:
        wait = WebDriverWait(driver, timeout)
        message_element = wait.until(
            EC.presence_of_element_located(
                (By.ID, "MainContent_UC_MensajeInformativo_divAdvertencia")
            )
        )
        return message_element.text.strip()
    except TimeoutException:
        return None


def juzgadostyba_selenium_grid(
    cc: str,
    person: dict = None,
    dest: str = ".",
    screens: bool = False,
    typedoc: str = "CC",
    view_public_process: int = 10,
) -> dict:
    """
    Main function to scrape judicial processes using Selenium Grid.
    
    Args:
        cc: Document number to search
        person: Dictionary to store results
        dest: Destination path for screenshots
        screens: Whether to take screenshots
        typedoc: Document type (CC, CE, etc.)
        view_public_process: Maximum number of public processes to view details
        
    Returns:
        Dictionary with results in person["juzgados_tyba"]
    """
    if person is None:
        person = {}
    
    url: str = WEBSITE_URL
    driver: Optional[WebDriver] = None
    
    try:
        # Initialize proxies service
        proxies_service = ServicesProxies()
        proxies_service.get_active_proxies()
        
        # Create Firefox driver (best reCAPTCHA score)
        logging.info("Creating Firefox driver via Selenium Grid")
        driver = create_firefox_driver()
        
        headers = None
        
        for attempt in range(1):
            logging.info(f"Starting attempt: {attempt + 1}")
            
            # Navigate to URL
            logging.info(f"Navigating to: {url}")
            driver.get(url)
            logging.info("Page loaded")
            
            # Select document type
            document_type = tyba_utils.get_type_doc(typedoc)
            
            # Fill the form
            if not input_form_data(driver, document_type, cc):
                person["juzgados_tyba"] = "Error"
                close_browser(driver)
                return person
            
            # Click consult button
            if not press_consult_button(driver):
                close_browser(driver)
                person["juzgados_tyba"] = "Error"
                return person
            
            # Wait for informative message
            time.sleep(2)
            info_text = wait_for_informative_message(driver, timeout=6)
            
            if not info_text:
                logging.info("Informative message not found")
                person["juzgados_tyba"] = "Error"
                time.sleep(1)
                continue
            
            logging.info(f"Informative message: {info_text}")
            
            # Check message content
            message_list: list = [
                "¡Correcto!",
                "Regristos coincidentes",
                "Se visualizan proceso(s)",
            ]
            
            if "No se encontraron registros." in info_text:
                logging.info("No records found")
                person["juzgados_tyba"] = []
                
                if screens:
                    time.sleep(1)
                    document_image = driver.get_screenshot_as_png()
                    tyba_utils.store_image(img=document_image, dest=dest)
                
                close_browser(driver)
                return person
            
            elif any(message in info_text for message in message_list):
                tyba_data = TybaData()
                
                # Get initial table data
                try:
                    page_content = driver.page_source
                    soup = BeautifulSoup(page_content, "html.parser")
                    datos_tabla = tyba_data.get_data_table_from_soup(soup)
                except Exception as e:
                    logging.warning(f"Error getting table data: {e}")
                    close_browser(driver)
                    person["juzgados_tyba"] = "Error"
                    return person
                
                # Process count
                logging.info(f"Total processes: {len(datos_tabla)}")
                
                try:
                    total_rows_element = driver.find_element(
                        By.ID, "MainContent_lblTotalRows"
                    )
                    total_rows_text = total_rows_element.text
                    total_rows = int(total_rows_text.replace(",", "").strip())
                except (NoSuchElementException, ValueError):
                    total_rows = 0
                
                # Separate public and private processes
                public_processes = [row for row in datos_tabla if "public" in row]
                logging.info(f"Total public processes: {len(public_processes)}")
                
                private_processes = [row for row in datos_tabla if "public" not in row]
                logging.info(f"Total private processes: {len(private_processes)}")
                
                # Create process list
                processes_full: list = []
                
                # Add private processes
                for priv_process in private_processes:
                    processes_full.append(tyba_data.clear_init_process(priv_process))
                
                # Get viewstate
                page_content = driver.page_source
                viewstate_value = get_view_state(page_content)
                
                # Get cookies and headers for subsequent requests
                cookies = driver.get_cookies()
                cookie_string = "; ".join(
                    [f"{c['name']}={c['value']}" for c in cookies]
                )
                headers = {
                    "Cookie": cookie_string,
                    "User-Agent": driver.execute_script("return navigator.userAgent;"),
                }
                
                if screens:
                    document_image = driver.get_screenshot_as_png()
                    tyba_utils.store_image(img=document_image, dest=dest)
                
                # Close browser session
                close_browser(driver)
                driver = None
                logging.info("Remote session closed")
                
                # Get details for public processes
                for index, data_process in enumerate(public_processes):
                    if index < view_public_process:
                        try:
                            # Initialize request
                            detail_request = TybaRequest()
                            detail_request.init_request(
                                base_url=BASE_URL,
                                viewstate=viewstate_value,
                                headers=headers,
                                proxy=proxies_service.get_sources_proxies("juzgados_tyba"),
                            )
                            
                            process_dict_all: dict = {}
                            logging.info(
                                f"Selecting process detail: {data_process.get('public')}"
                            )
                            
                            # Make POST request
                            post_response = detail_request.post_data_detail(
                                target_state=data_process.get("public"),
                                document_type=document_type,
                                document=cc,
                            )
                            
                            if not post_response or "pageRedirect" not in post_response:
                                logging.warning("POST request error")
                                person["juzgados_tyba"] = "Error"
                                return person
                            
                            # GET request for details
                            data_response = detail_request.get_data_detail()
                            
                            if not data_response:
                                logging.warning("GET request error")
                                person["juzgados_tyba"] = "Error"
                                return person
                            
                            # Extract process details
                            process_detail = tyba_data.get_data_process_detail(
                                data_response
                            )
                            process_detail.update(data_process)
                            process_info = tyba_data.clear_process_info(process_detail)
                            process_subject = tyba_data.get_data_process_subject(
                                data_response
                            )
                            process_actions = tyba_data.get_data_process_actions(
                                data_response
                            )
                            
                            process_info["sujetos"] = process_subject
                            process_info["actuaciones"] = process_actions
                            process_dict_all["INFO PROCES0"] = process_info
                            process_dict_all.update(
                                tyba_data.clear_init_process(data_process)
                            )
                            processes_full.append(process_dict_all)
                            
                        except Exception as e:
                            logging.warning(f"Error processing detail: {e}")
                            close_browser(driver)
                            person["juzgados_tyba"] = "Error"
                            return person
                    else:
                        # Add public processes without details
                        data_process["INFO PROCES0"] = {}
                        processes_full.append(
                            tyba_data.clear_init_process(data_process)
                        )
                
                # Return response
                processes_info = tyba_utils.sorted_process(processes_full)
                processes_info[0]["total_rows"] = total_rows
                person["juzgados_tyba"] = processes_info
                logging.info("Query completed")
                return person
            
            elif "¡Error!" in info_text:
                logging.warning("Captcha mismatch")
                person["juzgados_tyba"] = "Error"
                time.sleep(1)
            
            else:
                logging.info("Informative message not recognized")
                person["juzgados_tyba"] = "Error"
                time.sleep(1)
        
        # End of loop
        logging.info("Loop finished")
        person["juzgados_tyba"] = "Error"
        logging.info("Closing browser")
        close_browser(driver)
        return person
        
    except JobTimeoutException:
        logging.warning("juzgadostyba: JobTimeoutException error")
        person["juzgados_tyba"] = "Error"
        return person
    
    except TimeoutException:
        logging.warning("Operation exceeded timeout")
        close_browser(driver)
        person["juzgados_tyba"] = "Error"
        return person
    
    except WebDriverException as e:
        logging.warning(f"WebDriver error: {e}")
        close_browser(driver)
        person["juzgados_tyba"] = "Error"
        return person
    
    except Exception as e:
        logging.error(f"Error: {e}")
        close_browser(driver)
        person["juzgados_tyba"] = "Error"
        return person
