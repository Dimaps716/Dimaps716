import React from 'react';
import { BellRing, BrainCircuit, SearchCode, Clock, FileSearch, MessageCircle } from 'lucide-react';
import { AnimateIn } from './AnimateIn';

const features = [
  {
    title: 'Monitoreo Diario Automatizado',
    description: 'Escaneamos la DNCP (Paraguay), SEACE (Perú) y Compras Dominicanas cada mañana antes de que abras tu email. Cero trabajo manual de búsqueda.',
    icon: Clock,
  },
  {
    title: 'IA que Lee los Pliegos',
    description: 'Nuestros modelos procesan cientos de páginas de requisitos técnicos y los cruzan con tu perfil de empresa. Solo te avisamos si calificas de verdad.',
    icon: FileSearch,
  },
  {
    title: 'Alerta Instantánea en WhatsApp',
    description: 'El canal donde ya estás. Recibes un resumen ejecutivo con presupuesto, fecha límite y un enlace directo al pliego oficial. Todo en menos de 4 minutos.',
    icon: MessageCircle,
  },
];

const steps = [
  {
    number: '01',
    title: 'Crea tu perfil de empresa',
    description: 'Sube tu RUC, rubro de actividad y contratos anteriores. La IA aprende qué tipo de licitaciones puedes ganar.',
    icon: SearchCode
  },
  {
    number: '02',
    title: 'LicitaBot trabaja 24/7',
    description: 'Mientras tú operas tu negocio, el bot lee cada convocatoria publicada y valida si cumples los requisitos técnicos y legales.',
    icon: BrainCircuit
  },
  {
    number: '03',
    title: 'Solo prepara tu oferta',
    description: 'Recibe la alerta en WhatsApp con el análisis de viabilidad listo. Tu equipo entra directo a preparar la propuesta ganadora.',
    icon: BellRing
  }
];

export default function Features() {
  return (
    <section id="features" className="relative bg-white pt-24 pb-24 sm:pt-32 sm:pb-32">
      {/* Top edge blends from Hero dark */}
      <div className="absolute top-0 left-0 right-0 h-px bg-zinc-100" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <AnimateIn className="mx-auto max-w-2xl text-center mb-20">
          <span className="inline-block text-xs font-semibold text-emerald-600 tracking-widest uppercase mb-4 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
            Cómo funciona
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl mb-4 balance">
            Deja de buscar pliegos.<br />Empieza a ganar contratos.
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed">
            Las empresas que ganan más contratos públicos no tienen más tiempo — tienen mejores herramientas. LicitaBot hace en minutos lo que un equipo tardaría días.
          </p>
        </AnimateIn>

        {/* 3 Feature Cards */}
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3 mb-24">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <AnimateIn key={index} delay={index * 120}>
                <div className="flex flex-col h-full p-8 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all duration-300 group">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-zinc-200 mb-6 shadow-sm group-hover:border-emerald-200 group-hover:shadow-emerald-100 transition-all">
                    <Icon className="h-5 w-5 text-zinc-700 group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 mb-2">{feat.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-500">{feat.description}</p>
                </div>
              </AnimateIn>
            );
          })}
        </div>

        {/* 3-Step Process — dark card */}
        <AnimateIn delay={150}>
          <div className="mx-auto max-w-5xl bg-zinc-900 rounded-3xl p-10 sm:p-14 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.08),transparent)]" />
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
              <div className="lg:w-[35%] shrink-0">
                <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase">Proceso</span>
                <h2 className="text-2xl font-bold text-white mt-2 mb-3 leading-snug">
                  De convocatoria a oferta en 3 pasos.
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Configúrate una vez. Después, LicitaBot trabaja de forma autónoma todos los días.
                </p>
              </div>
              
              <div className="lg:w-[65%] grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={index} className="flex flex-col relative group">
                      {index < 2 && (
                        <div className="hidden sm:block absolute top-5 left-[56%] w-[88%] h-px bg-zinc-700 -z-0" />
                      )}
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 mb-4 relative z-10 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-all">
                        <IconComponent className="h-4 w-4 text-emerald-400" />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-600 tracking-widest mb-1">{step.number}</span>
                      <h3 className="text-sm font-semibold text-zinc-100 mb-1.5">{step.title}</h3>
                      <p className="text-xs text-zinc-500 leading-relaxed">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </AnimateIn>

      </div>
    </section>
  );
}
