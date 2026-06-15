"""
TYBA with Human-like JavaScript Events.

Uses low-level JavaScript events instead of Selenium's synthetic events
to better simulate real human interaction and bypass reCAPTCHA v3.
"""

import os
import time
import random
from datetime import datetime
from typing import Dict, List, Optional

from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions


# Constants
SELENIUM_GRID_URL = "http://34.63.210.73:4444/wd/hub"
SELENIUM_GRID_URL_LOCAL = "http://localhost:4454/wd/hub"
USE_REMOTE = True  # Set to False for local testing

# Proxy configuration (format: host:port:username:password)
PROXY_CONFIG = "co.decodo.com:30002:sptm0fkbgt:DF+zp4lsYz4qDt0d6u"
USE_PROXY = True  # Enable proxy for remote Grid

TYBA_URL = (
    "https://procesojudicial.ramajudicial.gov.co/Justicia21/"
    "Administracion/Ciudadanos/frmConsulta.aspx?opcion=consulta"
)
SCREENSHOTS_DIR = "/home/dima/Documentos/Dimaps716/screenshots"

# Selectors
SELECTOR_CIUDADANO_TAB = "a[href*='#Ciudadano']"
SELECTOR_TIPO_DOCUMENTO = "#MainContent_ddlTipoDocumento"
SELECTOR_NUMERO_IDENTIFICACION = "#MainContent_txtNumeroIdentificacion"
SELECTOR_BTN_CONSULTAR = "#MainContent_btnConsultar"
SELECTOR_BTN_LIMPIAR = "#MainContent_btnLimpiar"

# Status icons
STATUS_ICONS = {
    "success": "✅",
    "no_records": "📭",
    "blocked": "❌",
    "error": "⚠️",
    "exception": "💥",
    "unknown": "❓",
}


def random_delay(min_ms: int, max_ms: int) -> None:
    """Random delay in milliseconds."""
    time.sleep(random.randint(min_ms, max_ms) / 1000)


def create_driver() -> webdriver.Remote:
    """Create Chrome driver with stealth options."""
    options = ChromeOptions()
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option("useAutomationExtension", False)

    driver = webdriver.Remote(
        command_executor=SELENIUM_GRID_URL,
        options=options
    )

    # Hide webdriver fingerprint
    driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
        "source": """
            Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
            window.chrome = {runtime: {}};
            Object.defineProperty(navigator, 'plugins', {get: () => [1, 2, 3, 4, 5]});
            Object.defineProperty(navigator, 'languages', {get: () => ['es-ES', 'es', 'en']});
        """
    })

    return driver


def inject_human_simulation_script(driver: webdriver.Remote) -> None:
    """Inject JavaScript functions for human-like events."""
    script = """
    window.humanSim = {
        bezierPoint: function(t, p0, p1, p2, p3) {
            const u = 1 - t;
            return u*u*u*p0 + 3*u*u*t*p1 + 3*u*t*t*p2 + t*t*t*p3;
        },
        
        generateBezierPath: function(startX, startY, endX, endY, steps) {
            const points = [];
            const cp1x = startX + (endX - startX) * 0.25 + (Math.random() - 0.5) * 100;
            const cp1y = startY + (endY - startY) * 0.25 + (Math.random() - 0.5) * 100;
            const cp2x = startX + (endX - startX) * 0.75 + (Math.random() - 0.5) * 100;
            const cp2y = startY + (endY - startY) * 0.75 + (Math.random() - 0.5) * 100;
            
            for (let i = 0; i <= steps; i++) {
                const t = i / steps;
                const noise = Math.random() * 2 - 1;
                points.push({
                    x: this.bezierPoint(t, startX, cp1x, cp2x, endX) + noise,
                    y: this.bezierPoint(t, startY, cp1y, cp2y, endY) + noise
                });
            }
            return points;
        },
        
        dispatchMouseEvent: function(element, type, x, y) {
            const rect = element.getBoundingClientRect();
            const clientX = rect.left + x;
            const clientY = rect.top + y;
            
            const event = new MouseEvent(type, {
                bubbles: true,
                cancelable: true,
                view: window,
                detail: type === 'click' || type === 'dblclick' ? 1 : 0,
                screenX: clientX + window.screenX,
                screenY: clientY + window.screenY,
                clientX: clientX,
                clientY: clientY,
                ctrlKey: false,
                altKey: false,
                shiftKey: false,
                metaKey: false,
                button: 0,
                buttons: type === 'mousedown' ? 1 : 0,
                relatedTarget: null
            });
            
            element.dispatchEvent(event);
        },
        
        moveMouseTo: async function(element, duration) {
            const rect = element.getBoundingClientRect();
            const endX = rect.left + rect.width / 2 + (Math.random() - 0.5) * 10;
            const endY = rect.top + rect.height / 2 + (Math.random() - 0.5) * 10;
            
            const startX = window.lastMouseX || Math.random() * window.innerWidth;
            const startY = window.lastMouseY || Math.random() * window.innerHeight;
            
            const steps = Math.floor(duration / 16);
            const path = this.generateBezierPath(startX, startY, endX, endY, steps);
            
            for (let i = 0; i < path.length; i++) {
                const point = path[i];
                const event = new MouseEvent('mousemove', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: point.x,
                    clientY: point.y,
                    screenX: point.x + window.screenX,
                    screenY: point.y + window.screenY
                });
                
                document.dispatchEvent(event);
                await new Promise(r => setTimeout(r, 10 + Math.random() * 10));
            }
            
            window.lastMouseX = endX;
            window.lastMouseY = endY;
            
            this.dispatchMouseEvent(element, 'mouseenter', rect.width/2, rect.height/2);
            this.dispatchMouseEvent(element, 'mouseover', rect.width/2, rect.height/2);
        },
        
        humanClick: async function(element) {
            await this.moveMouseTo(element, 300 + Math.random() * 200);
            await new Promise(r => setTimeout(r, 50 + Math.random() * 100));
            
            const rect = element.getBoundingClientRect();
            const offsetX = rect.width / 2 + (Math.random() - 0.5) * 10;
            const offsetY = rect.height / 2 + (Math.random() - 0.5) * 6;
            
            this.dispatchMouseEvent(element, 'mousedown', offsetX, offsetY);
            await new Promise(r => setTimeout(r, 50 + Math.random() * 80));
            this.dispatchMouseEvent(element, 'mouseup', offsetX, offsetY);
            await new Promise(r => setTimeout(r, 10 + Math.random() * 20));
            this.dispatchMouseEvent(element, 'click', offsetX, offsetY);
            
            if (element.focus) element.focus();
        },
        
        humanType: async function(element, text) {
            element.focus();
            element.value = '';
            element.dispatchEvent(new Event('input', {bubbles: true}));
            
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const keyCode = char.charCodeAt(0);
                
                const keydownEvent = new KeyboardEvent('keydown', {
                    key: char,
                    code: 'Key' + char.toUpperCase(),
                    keyCode: keyCode,
                    which: keyCode,
                    bubbles: true,
                    cancelable: true
                });
                element.dispatchEvent(keydownEvent);
                
                element.value += char;
                element.dispatchEvent(new Event('input', {bubbles: true}));
                
                const keyupEvent = new KeyboardEvent('keyup', {
                    key: char,
                    code: 'Key' + char.toUpperCase(),
                    keyCode: keyCode,
                    which: keyCode,
                    bubbles: true,
                    cancelable: true
                });
                element.dispatchEvent(keyupEvent);
                
                let delay = 50 + Math.random() * 100;
                if (Math.random() < 0.1) delay += 200;
                await new Promise(r => setTimeout(r, delay));
            }
            
            element.dispatchEvent(new Event('change', {bubbles: true}));
        },
        
        humanSelect: async function(selectElement, value) {
            await this.moveMouseTo(selectElement, 200 + Math.random() * 150);
            selectElement.focus();
            await new Promise(r => setTimeout(r, 100 + Math.random() * 100));
            
            const options = selectElement.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].text.includes(value) || options[i].value.includes(value)) {
                    selectElement.selectedIndex = i;
                    break;
                }
            }
            
            selectElement.dispatchEvent(new Event('change', {bubbles: true}));
            selectElement.dispatchEvent(new Event('input', {bubbles: true}));
        },
        
        randomMouseMovement: async function(duration) {
            const endTime = Date.now() + duration;
            while (Date.now() < endTime) {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                
                const event = new MouseEvent('mousemove', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: x,
                    clientY: y
                });
                document.dispatchEvent(event);
                
                await new Promise(r => setTimeout(r, 100 + Math.random() * 200));
            }
        },
        
        humanScroll: async function(amount) {
            const steps = Math.abs(amount) / 10;
            const direction = amount > 0 ? 1 : -1;
            
            for (let i = 0; i < steps; i++) {
                window.scrollBy({
                    top: direction * (8 + Math.random() * 4),
                    behavior: 'auto'
                });
                await new Promise(r => setTimeout(r, 10 + Math.random() * 20));
            }
        }
    };
    
    console.log('Human simulation script injected');
    """
    driver.execute_script(script)


def human_click(driver: webdriver.Remote, selector: str) -> None:
    """Click element with human-like behavior."""
    driver.execute_script("""
        (async () => {
            const element = document.querySelector(arguments[0]);
            if (element) {
                await window.humanSim.humanClick(element);
            }
        })();
    """, selector)
    random_delay(200, 400)


def human_type(driver: webdriver.Remote, selector: str, text: str) -> None:
    """Type text with human-like behavior."""
    driver.execute_script("""
        (async () => {
            const element = document.querySelector(arguments[0]);
            if (element) {
                await window.humanSim.humanType(element, arguments[1]);
            }
        })();
    """, selector, text)
    time.sleep(len(text) * 0.12 + 0.5)


def human_select(driver: webdriver.Remote, selector: str, value: str) -> None:
    """Select option with human-like behavior."""
    driver.execute_script("""
        (async () => {
            const element = document.querySelector(arguments[0]);
            if (element) {
                await window.humanSim.humanSelect(element, arguments[1]);
            }
        })();
    """, selector, value)
    random_delay(300, 500)


def random_mouse_activity(driver: webdriver.Remote, duration_ms: int) -> None:
    """Generate random mouse movements."""
    driver.execute_script("""
        (async () => {
            await window.humanSim.randomMouseMovement(arguments[0]);
        })();
    """, duration_ms)
    time.sleep(duration_ms / 1000 + 0.1)


def human_scroll(driver: webdriver.Remote, amount: int) -> None:
    """Scroll with human-like behavior."""
    driver.execute_script("""
        (async () => {
            await window.humanSim.humanScroll(arguments[0]);
        })();
    """, amount)
    random_delay(200, 400)


def parse_query_result(page_source: str) -> Dict[str, any]:
    """
    Parse page source to determine query result status.
    
    Args:
        page_source: HTML content of the page
        
    Returns:
        dict with status, records count, and error message
    """
    if "Capcha no coincide" in page_source:
        return {"status": "blocked", "records": 0, "error": "reCAPTCHA blocked"}
    
    if "No se encontraron registros" in page_source:
        return {"status": "no_records", "records": 0, "error": None}
    
    if "Resultado de la Busqueda" in page_source or "CÓDIGO PROCESO" in page_source:
        records = page_source.count("DESPACHO COMISORIO") + page_source.count("JUZGADO")
        return {"status": "success", "records": records, "error": None}
    
    if "Error" in page_source:
        return {"status": "error", "records": 0, "error": "Page error"}
    
    return {"status": "unknown", "records": 0, "error": None}


def consultar_cedula(
    driver: webdriver.Remote,
    cedula: str,
    first_query: bool = False
) -> Dict[str, any]:
    """
    Query a single cedula and return results.
    
    Args:
        driver: WebDriver instance
        cedula: Document number to query
        first_query: If True, do full warmup. If False, just clear and query.
    
    Returns:
        dict with status, records, and error
    """
    result = {
        "cedula": cedula,
        "status": "unknown",
        "records": 0,
        "error": None
    }

    try:
        if first_query:
            print(f"\n[{cedula}] Warming up...")
            random_mouse_activity(driver, 1500)

            print(f"[{cedula}] Clicking 'Ciudadano' tab...")
            human_click(driver, SELECTOR_CIUDADANO_TAB)
            time.sleep(1)

            print(f"[{cedula}] Random exploration...")
            human_scroll(driver, 100)
            random_mouse_activity(driver, 1000)

            print(f"[{cedula}] Selecting 'CÉDULA DE CIUDADANIA'...")
            human_select(driver, SELECTOR_TIPO_DOCUMENTO, "CÉDULA")
            random_mouse_activity(driver, 800)
        else:
            print(f"\n[{cedula}] Clearing form...")
            human_click(driver, SELECTOR_BTN_LIMPIAR)
            time.sleep(1)

            human_click(driver, SELECTOR_CIUDADANO_TAB)
            time.sleep(0.5)
            human_select(driver, SELECTOR_TIPO_DOCUMENTO, "CÉDULA")
            random_delay(300, 500)

        print(f"[{cedula}] Clicking document field...")
        human_click(driver, SELECTOR_NUMERO_IDENTIFICACION)
        random_delay(200, 400)

        print(f"[{cedula}] Typing '{cedula}'...")
        human_type(driver, SELECTOR_NUMERO_IDENTIFICACION, cedula)

        random_mouse_activity(driver, 800)

        print(f"[{cedula}] Clicking 'Consultar'...")
        random_delay(300, 600)
        human_click(driver, SELECTOR_BTN_CONSULTAR)

        print(f"[{cedula}] Waiting for response...")
        time.sleep(8)

        page_source = driver.page_source
        parsed = parse_query_result(page_source)
        result.update(parsed)

    except Exception as e:
        result["status"] = "exception"
        result["error"] = str(e)

    return result


def save_screenshot(driver: webdriver.Remote, cedula: str) -> str:
    """
    Save screenshot for a query result.
    
    Args:
        driver: WebDriver instance
        cedula: Document number
        
    Returns:
        Path to saved screenshot
    """
    os.makedirs(SCREENSHOTS_DIR, exist_ok=True)
    screenshot_path = os.path.join(SCREENSHOTS_DIR, f"tyba_{cedula}.png")
    driver.save_screenshot(screenshot_path)
    return screenshot_path


def print_query_result(result: Dict[str, any]) -> None:
    """Print formatted query result."""
    icon = STATUS_ICONS.get(result["status"], "❓")
    print(f"\nResult: {icon} {result['status'].upper()}")
    
    if result["records"]:
        print(f"Records found: ~{result['records']}")
    
    if result["error"]:
        print(f"Error: {result['error']}")


def print_summary(results: List[Dict[str, any]]) -> None:
    """Print summary of all queries."""
    success = sum(1 for r in results if r["status"] == "success")
    no_records = sum(1 for r in results if r["status"] == "no_records")
    blocked = sum(1 for r in results if r["status"] == "blocked")
    errors = sum(1 for r in results if r["status"] in ["error", "exception"])

    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"\nTotal queries: {len(results)}")
    print(f"✅ Success: {success}")
    print(f"📭 No records: {no_records}")
    print(f"❌ Blocked: {blocked}")
    print(f"⚠️ Errors: {errors}")

    print("\nDetails:")
    print("-" * 50)
    for r in results:
        icon = STATUS_ICONS.get(r["status"], "❓")
        print(f"  {r['cedula']}: {icon} {r['status']} ({r['records']} records)")
    print("=" * 70)


def validate_cedulas(cedulas: List[str]) -> List[str]:
    """
    Filter and validate cedulas list.
    
    Args:
        cedulas: List of document numbers (may contain empty strings)
        
    Returns:
        Filtered list of valid cedulas
    """
    valid_cedulas = [c.strip() for c in cedulas if c and c.strip()]
    
    if not valid_cedulas:
        raise ValueError("No valid cedulas provided")
    
    return valid_cedulas


def test_multiple_cedulas(cedulas: List[str]) -> List[Dict[str, any]]:
    """
    Test TYBA with multiple cedulas.
    
    Args:
        cedulas: List of document numbers to query
        
    Returns:
        List of query results
    """
    # Filter and validate cedulas
    valid_cedulas = validate_cedulas(cedulas)
    
    print("=" * 70)
    print("TYBA - MULTIPLE CEDULAS TEST")
    print(f"Total cedulas provided: {len(cedulas)}")
    print(f"Valid cedulas to process: {len(valid_cedulas)}")
    print(f"Cedulas: {', '.join(valid_cedulas)}")
    print("=" * 70)

    driver = None
    results = []

    try:
        print("\n[INIT] Creating driver...")
        driver = create_driver()
        driver.set_page_load_timeout(30)

        print("[INIT] Navigating to TYBA...")
        driver.get(TYBA_URL)
        time.sleep(3)

        print("[INIT] Injecting human simulation script...")
        inject_human_simulation_script(driver)
        time.sleep(1)

        for i, cedula in enumerate(valid_cedulas):
            print(f"\n{'='*50}")
            print(f"Query {i+1}/{len(valid_cedulas)}: {cedula}")
            print(f"{'='*50}")

            is_first = (i == 0)
            result = consultar_cedula(driver, cedula, first_query=is_first)
            results.append(result)

            print_query_result(result)

            screenshot_path = save_screenshot(driver, cedula)
            print(f"Screenshot: {screenshot_path}")

            if result["status"] == "blocked":
                print("\n⚠️ BLOCKED! Stopping test.")
                break

            if i < len(valid_cedulas) - 1:
                pause = random.randint(3, 6)
                print(f"\nPausing {pause}s before next query...")
                time.sleep(pause)

        print_summary(results)
        return results

    except Exception as e:
        print(f"\nFatal error: {e}")
        if driver:
            error_path = os.path.join(SCREENSHOTS_DIR, "tyba_error.png")
            driver.save_screenshot(error_path)
        raise

    finally:
        if driver:
            print("\nClosing browser in 3 seconds...")
            time.sleep(3)
            driver.quit()


if __name__ == "__main__":
    TEST_CEDULAS = [
        "71671588",
        "",
        "",
    ]

    test_multiple_cedulas(TEST_CEDULAS)
