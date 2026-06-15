import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import { HelpCircle, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Header/Navbar - Dark */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.5)]">
                <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                LicitaBot
              </span>
            </a>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                Características
              </a>
              <a href="#pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                Precios
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 hover:bg-emerald-400 px-5 py-2 text-sm font-semibold text-zinc-900 transition-colors shadow-[0_0_16px_rgba(16,185,129,0.3)]"
              >
                Solicitar Acceso
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Sections */}
      <main className="flex-1">
        <Hero />
        <Features />
        <Pricing />
      </main>

      {/* FAQ Section */}
      <section className="bg-zinc-50 py-24 border-t border-zinc-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900">Preguntas frecuentes</h2>
            <p className="text-base text-zinc-500 mt-3">Todo lo que necesitas saber antes de unirte a la lista de espera.</p>
          </div>
          <div className="mx-auto max-w-3xl grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="bg-white p-7 rounded-2xl border border-zinc-100 shadow-sm">
              <h4 className="font-semibold text-zinc-900 text-sm flex items-start gap-2">
                <HelpCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                ¿Qué portales de licitaciones monitorean?
              </h4>
              <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
                Monitoreamos de forma exclusiva la <strong className="text-zinc-700">DNCP de Paraguay</strong>, el <strong className="text-zinc-700">SEACE de Perú</strong> y el portal de <strong className="text-zinc-700">Compras Dominicanas</strong>. Estos tres portales publican miles de convocatorias al año por un valor combinado superior a los 5.000 millones de dólares.
              </p>
            </div>
            <div className="bg-white p-7 rounded-2xl border border-zinc-100 shadow-sm">
              <h4 className="font-semibold text-zinc-900 text-sm flex items-start gap-2">
                <HelpCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                ¿Cómo sabe la IA si mi empresa puede ganar?
              </h4>
              <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
                Al configurar tu perfil cargas tu RUC, rubro de actividad y contratos anteriores. La IA compara esos datos con los requisitos del pliego (experiencia mínima, capital de trabajo, certificaciones) y calcula un porcentaje de viabilidad antes de enviarte la alerta.
              </p>
            </div>
            <div className="bg-white p-7 rounded-2xl border border-zinc-100 shadow-sm">
              <h4 className="font-semibold text-zinc-900 text-sm flex items-start gap-2">
                <HelpCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                ¿Tengo que instalar algo en mi teléfono?
              </h4>
              <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
                No. Configuras tu cuenta desde nuestra plataforma web. Las alertas llegan a tu WhatsApp existente como mensajes normales. No hace falta descargar ninguna app adicional.
              </p>
            </div>
            <div className="bg-white p-7 rounded-2xl border border-zinc-100 shadow-sm">
              <h4 className="font-semibold text-zinc-900 text-sm flex items-start gap-2">
                <HelpCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                ¿Cuándo estará disponible?
              </h4>
              <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
                Estamos en fase de Early Access. Al unirte a la lista de espera serás de los primeros en recibir acceso y tendrás un precio especial de lanzamiento bloqueado, sin importar cómo cambien los precios después.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-zinc-900" />
                </div>
                <span className="font-bold text-zinc-900 text-base">LicitaBot</span>
              </div>
              <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
                Inteligencia artificial para que las PYMEs de Paraguay, Perú y Rep. Dominicana compitan y ganen contratos del Estado.
              </p>
            </div>
            
            {/* Links Column */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-900 mb-4">Producto</h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li><a href="#features" className="hover:text-zinc-900 transition-colors">Características</a></li>
                <li><a href="#pricing" className="hover:text-zinc-900 transition-colors">Precios</a></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-900 mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li><Link href="/terminos" className="hover:text-zinc-900 transition-colors">Términos de Servicio</Link></li>
                <li><Link href="/privacidad" className="hover:text-zinc-900 transition-colors">Privacidad</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
            <p>© {new Date().getFullYear()} LicitaBot. Todos los derechos reservados.</p>
            <p>Hecho para proveedores de LATAM.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
