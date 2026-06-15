import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>
        
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Política de Privacidad Integral</h1>
        <p className="text-sm text-zinc-500 mb-8">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        
        <div className="prose prose-zinc prose-sm sm:prose-base text-zinc-600 space-y-6">
          <p>
            En LicitaBot AI ("nosotros", "la Empresa"), estamos comprometidos con el procesamiento legal, leal y transparente de la información. Esta Política de Privacidad describe exhaustivamente cómo recopilamos, utilizamos, almacenamos y compartimos la información de nuestros Clientes B2B ("Usuario") al interactuar con nuestra plataforma web y servicios de notificaciones.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">1. Identificación y Recopilación de Datos</h2>
          <p>
            Recopilamos datos mínimos e indispensables para la prestación del servicio comercial:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Datos de Identificación y Contacto:</strong> Nombre del representante legal o comercial, correo electrónico corporativo, y número de teléfono (exclusivamente para la integración con la API de WhatsApp).</li>
            <li><strong>Datos Operativos y Perfil de Negocio:</strong> Nombre de la empresa, RUC/NIT, países de interés operativo (Paraguay, Perú, República Dominicana), palabras clave del sector industrial, historial de licitaciones de interés y documentos técnicos cargados voluntariamente por el Cliente para mejorar el entrenamiento de los algoritmos de IA.</li>
            <li><strong>Datos Técnicos (Log Data):</strong> Direcciones IP, tipo de navegador, tiempo de sesión y métricas de interacción con la plataforma, recopilados mediante cookies y tecnologías similares con fines de seguridad y optimización.</li>
          </ul>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">2. Base Legal y Propósito del Tratamiento</h2>
          <p>
            Tratamos sus datos basándonos en el <strong>consentimiento expreso</strong> y en la <strong>necesidad de ejecución contractual</strong> para los siguientes fines:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Prestación del Servicio Central:</strong> Utilizar los parámetros de la empresa para filtrar bases de datos públicas, emplear modelos de IA (LLMs) para analizar pliegos y entregar resúmenes de viabilidad de negocio.</li>
            <li><strong>Comunicaciones Operativas:</strong> Enviar alertas automatizadas críticas de nuevas licitaciones directamente al número de WhatsApp proporcionado, así como correos transaccionales (facturación, actualizaciones del servicio).</li>
            <li><strong>Prevención de Fraude y Seguridad:</strong> Monitorizar los patrones de acceso para detectar usos no autorizados de la cuenta o violaciones a los Términos de Servicio (scraping inverso).</li>
          </ul>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">3. Transferencia y Divulgación a Terceros</h2>
          <p>
            <strong>Garantía de No Comercialización:</strong> LicitaBot garantiza contractualmente que NO vende, alquila, trafica ni cede a corredores de datos (data brokers) la información corporativa o de contacto de sus Clientes.
          </p>
          <p>
            Para garantizar la operatividad de la infraestructura de software, compartimos datos bajo estrictos acuerdos de confidencialidad (DPA) exclusivamente con los siguientes subprocesadores autorizados:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Meta Platforms, Inc. (WhatsApp Cloud API):</strong> Para el enrutamiento y entrega de los mensajes de notificación comercial. Tenga en cuenta que los metadatos del mensaje están sujetos a las políticas propias de cifrado y privacidad de Meta.</li>
            <li><strong>Proveedores de Infraestructura en la Nube y Bases de Datos (Supabase / AWS):</strong> Para el alojamiento seguro, cifrado en reposo (Encryption at Rest) y control de acceso basado en roles (Row Level Security).</li>
            <li><strong>Proveedores de Modelos de Inteligencia Artificial (OpenAI / Anthropic):</strong> Los pliegos gubernamentales (que son documentos públicos) y los criterios de búsqueda (anonimizados en la medida de lo posible) se transmiten a modelos LLM para la generación del análisis. Hemos inhabilitado la opción de que estos proveedores utilicen los datos procesados por LicitaBot para entrenar sus propios modelos base.</li>
            <li><strong>Pasarelas de Pago Autorizadas (Stripe / equivalentes):</strong> LicitaBot no procesa ni almacena números completos de tarjetas de crédito.</li>
          </ul>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">4. Seguridad, Retención y Cifrado</h2>
          <p>
            Utilizamos protocolos de transmisión segura (TLS/SSL) y bases de datos cifradas. Mantendremos los datos de la cuenta activa del Cliente mientras dure la relación comercial. En caso de terminación o cancelación de la cuenta, conservaremos la información de facturación por el período requerido por la legislación tributaria aplicable (generalmente hasta 5 años) en formato bloqueado, procediendo a la anonimización o destrucción segura de los datos del perfil de negocio y alertas generadas.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">5. Derechos del Titular (Derechos ARCO)</h2>
          <p>
            Conforme a la normativa internacional aplicable a la protección de datos en entornos digitales, usted tiene el derecho irrevocable de:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Acceso:</strong> Solicitar un reporte completo de los datos almacenados por LicitaBot.</li>
            <li><strong>Rectificación:</strong> Corregir información inexacta o desactualizada de su perfil.</li>
            <li><strong>Cancelación (Derecho al Olvido):</strong> Solicitar el borrado de sus datos (sujeto a retenciones legales por obligaciones fiscales vigentes).</li>
            <li><strong>Oposición:</strong> Darse de baja de los flujos de mensajería (opt-out) en cualquier momento, enviando un comando de "STOP" o "BAJA" al canal de WhatsApp, o mediante el panel de configuración de la cuenta.</li>
          </ul>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">6. Datos Públicos Extraídos (Web Scraping)</h2>
          <p>
            Toda la información referente a procesos de licitación, montos referenciales y nombres de adjudicatarios es descargada de repositorios públicos de carácter estatal que se rigen por las leyes de transparencia de sus respectivos países. La presente Política de Privacidad no aplica al tratamiento que LicitaBot realiza de dichos datos públicos oficiales, puesto que carecen de expectativa de privacidad según la legislación de acceso a la información gubernamental.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">7. Contacto Legal</h2>
          <p>
            Para cualquier notificación legal, solicitud de derechos ARCO o consulta sobre seguridad de la información, el Cliente debe comunicarse a través del correo oficial de soporte dispuesto por LicitaBot para asuntos legales.
          </p>
        </div>
      </div>
    </div>
  );
}
