import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>
        
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Términos y Condiciones de Servicio (ToS)</h1>
        <p className="text-sm text-zinc-500 mb-8">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        
        <div className="prose prose-zinc prose-sm sm:prose-base text-zinc-600 space-y-6">
          <p>
            El presente contrato (en adelante, los "Términos") regula el uso de la plataforma de software como servicio (SaaS) LicitaBot AI (en adelante, "la Plataforma", "LicitaBot" o "la Empresa"), diseñada para proporcionar servicios de agregación de datos, monitoreo automatizado y análisis de pliegos de contratación pública mediante Inteligencia Artificial.
          </p>
          <p>
            Al registrarse, acceder o utilizar la Plataforma, el Cliente ("Usuario", "Empresa") acepta quedar vinculado legalmente por estos Términos en su totalidad. Si no está de acuerdo con estos Términos, debe abstenerse de utilizar la Plataforma.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">1. Naturaleza del Servicio y Origen de los Datos</h2>
          <p>
            1.1. <strong>Agregación de Datos Públicos:</strong> LicitaBot utiliza técnicas automatizadas (incluyendo *web scraping* y consumo de APIs) para extraer, estructurar y presentar información de libre acceso publicada en portales gubernamentales oficiales (incluyendo, pero no limitándose a, la Dirección Nacional de Contrataciones Públicas - DNCP de Paraguay, el Sistema Electrónico de Contrataciones del Estado - SEACE de Perú, y el Portal de Compras Dominicanas).
          </p>
          <p>
            1.2. <strong>Independencia Gubernamental:</strong> LicitaBot es una entidad privada y comercial. NO está afiliada, autorizada, respaldada, patrocinada ni vinculada de forma alguna con los gobiernos de Paraguay, Perú, República Dominicana, ni con ninguna de sus agencias o ministerios.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">2. Renuncia de Garantías y Limitación Exhaustiva de Responsabilidad</h2>
          <p>
            2.1. <strong>Información "Tal Cual":</strong> La Plataforma retransmite información de terceros. LicitaBot no garantiza la exhaustividad, precisión, puntualidad, vigencia ni veracidad de los datos presentados. Pueden existir discrepancias, retrasos en la sincronización o errores de extracción.
          </p>
          <p>
            2.2. <strong>Uso de Inteligencia Artificial:</strong> Los análisis de pliegos, resúmenes ejecutivos y predicciones de viabilidad generados por LicitaBot son procesados mediante modelos de lenguaje probabilísticos (IA). Estos resultados tienen un fin <strong>estrictamente orientativo e informativo</strong> y NO constituyen asesoría legal, técnica, financiera ni comercial.
          </p>
          <p>
            2.3. <strong>Responsabilidad Exclusiva del Cliente:</strong> Es responsabilidad única e indelegable del Cliente acceder a las fuentes oficiales para descargar, leer y verificar los Pliegos de Bases y Condiciones, fechas de cierre, adendas y requisitos legales antes de presentar cualquier oferta al Estado.
          </p>
          <p>
            2.4. <strong>Exención Total de Daños:</strong> Bajo ninguna circunstancia (incluyendo negligencia) LicitaBot, sus directores, empleados o afiliados serán responsables por daños directos, indirectos, incidentales, punitivos o consecuentes. Esto incluye, sin limitación, la pérdida de contratos, lucro cesante, descalificación en procesos de licitación, sanciones gubernamentales o pérdida de datos derivados del uso, retraso o incapacidad de usar la Plataforma.
          </p>
          <p>
            2.5. <strong>Límite de Responsabilidad Económica:</strong> En las jurisdicciones que no permiten la exención total, la responsabilidad máxima acumulada de LicitaBot frente al Cliente por cualquier reclamación derivada de estos Términos estará estrictamente limitada al monto total pagado por el Cliente a LicitaBot durante los tres (3) meses inmediatamente anteriores al evento que generó el reclamo.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">3. Integración con Servicios de Terceros (WhatsApp)</h2>
          <p>
            3.1. Al proveer un número de teléfono, el Cliente autoriza expresamente a LicitaBot a enviar notificaciones automatizadas a través de WhatsApp (propiedad de Meta Platforms, Inc.).
          </p>
          <p>
            3.2. LicitaBot no es responsable por caídas del servicio de WhatsApp, bloqueos de números, políticas antispam de Meta, ni por la falta de entrega de los mensajes debido a problemas de conectividad o de la red de telecomunicaciones del Cliente.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">4. Disponibilidad (SLA) y Modificaciones del Servicio</h2>
          <p>
            4.1. Nos esforzamos por mantener la Plataforma operativa, pero no garantizamos una disponibilidad ininterrumpida (SLA de 99.9% aplicable exclusivamente a contratos Enterprise con anexo específico). Nos reservamos el derecho de interrumpir el servicio para mantenimientos programados o de emergencia.
          </p>
          <p>
            4.2. Si los portales gubernamentales cambian su estructura, bloquean el acceso automatizado, o exigen CAPTCHAs que impidan la recolección, el servicio podría degradarse. LicitaBot no asume responsabilidad por la interrupción forzosa debido a cambios en la infraestructura de terceros.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">5. Propiedad Intelectual y Licencia de Uso</h2>
          <p>
            5.1. LicitaBot otorga al Cliente una licencia limitada, no exclusiva e intransferible para usar el software con fines comerciales internos.
          </p>
          <p>
            5.2. Queda estrictamente prohibida la reventa, sublicencia, ingeniería inversa, scraping de nuestra plataforma o la creación de un servicio derivado basado en las alertas y datos suministrados por LicitaBot.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">6. Facturación, Pagos y Reembolsos</h2>
          <p>
            6.1. Los cargos por suscripción se facturan por adelantado. Las suscripciones se renuevan automáticamente salvo cancelación previa por parte del Cliente.
          </p>
          <p>
            6.2. La Garantía de 14 Días aplica exclusivamente para nuevos Clientes en su primer ciclo de facturación y debe solicitarse formalmente a soporte. Pasado este plazo, no se emitirán reembolsos prorrateados por cancelaciones anticipadas.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">7. Ley Aplicable y Jurisdicción</h2>
          <p>
            Para la resolución de cualquier controversia derivada de este contrato, las partes se someten expresamente al arbitraje y las leyes comerciales aplicables en la jurisdicción donde LicitaBot mantiene su registro legal corporativo principal, renunciando a cualquier otro fuero.
          </p>
        </div>
      </div>
    </div>
  );
}
