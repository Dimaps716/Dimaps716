"use client";

import React, { useState } from 'react';
import { Check, Shield } from 'lucide-react';
import { AnimateIn } from './AnimateIn';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Básico',
      description: 'Auditoría de mercado pasiva.',
      price: { monthly: 0, yearly: 0 },
      features: [
        { text: '1 país monitorizado', included: true },
        { text: 'Máximo 2 palabras clave', included: true },
        { text: 'Alertas en panel web', included: true },
        { text: 'Alertas por WhatsApp', included: false },
        { text: 'Filtro por IA', included: false },
      ],
      ctaText: 'Empezar gratis',
      featured: false,
    },
    {
      name: 'Profesional',
      description: 'El estándar para proveedores activos.',
      price: { monthly: 89, yearly: 79 },
      features: [
        { text: '3 países (PY, PE, DO)', included: true },
        { text: 'Palabras clave ilimitadas', included: true },
        { text: 'Alertas instantáneas WhatsApp', included: true },
        { text: 'Filtro de pliegos por IA', included: true },
        { text: 'Fichas y resúmenes ejecutivos', included: true },
      ],
      ctaText: 'Mejorar a Pro',
      featured: true,
    },
    {
      name: 'Enterprise',
      description: 'Automatización a gran escala.',
      price: { monthly: 249, yearly: 199 },
      features: [
        { text: 'Monitoreo en PY, PE y DO', included: true },
        { text: 'Múltiples perfiles comerciales', included: true },
        { text: 'Alertas multi-usuario', included: true },
        { text: 'Integración CRM / Webhooks', included: true },
        { text: 'Soporte prioritario y SLA', included: true },
      ],
      ctaText: 'Hablar con Ventas',
      featured: false,
    }
  ];

  return (
    <div id="pricing" className="bg-zinc-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        
        {/* Section Header */}
        <AnimateIn className="mx-auto max-w-2xl mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Precios transparentes
          </h2>
          <p className="mt-4 text-base text-zinc-500">
            Comienza gratis y escala a medida que tu empresa gane más contratos.
          </p>
        </AnimateIn>

        {/* Billing Cycle Switcher */}
        <AnimateIn delay={100} className="flex justify-center items-center gap-3 mb-16">
          <span className={`text-sm font-medium transition-colors ${billingCycle === 'monthly' ? 'text-zinc-900' : 'text-zinc-400'}`}>
            Mensual
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-zinc-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-900"
            aria-label="Toggle billing cycle"
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${billingCycle === 'yearly' ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors ${billingCycle === 'yearly' ? 'text-zinc-900' : 'text-zinc-400'} flex items-center gap-2`}>
            Anual 
            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 tracking-wider uppercase border border-emerald-100">
              -20%
            </span>
          </span>
        </AnimateIn>

        {/* Pricing Matrix */}
        <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3 items-stretch">
          {plans.map((plan, index) => (
            <AnimateIn key={index} delay={index * 150 + 200} className="h-full">
              <div
                className={`flex flex-col justify-between rounded-3xl bg-white p-8 transition-all duration-300 relative h-full ${
                  plan.featured 
                    ? 'border-2 border-zinc-900 shadow-xl hover:shadow-2xl z-10 hover:-translate-y-1' 
                    : 'border border-zinc-200 shadow-sm hover:shadow-md hover:-translate-y-1'
                } text-left`}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest">
                    Popular
                  </span>
                )}

                <div>
                  {/* Plan Header */}
                  <h3 className="text-lg font-semibold text-zinc-900">{plan.name}</h3>
                  <p className="mt-2 text-sm text-zinc-500 min-h-[40px]">{plan.description}</p>
                  
                  {/* Pricing Details */}
                  <div className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-zinc-900">
                      ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                    </span>
                    <span className="text-sm font-medium text-zinc-400">
                      /mes
                    </span>
                  </div>
                  {billingCycle === 'yearly' && plan.price.monthly > 0 && (
                    <p className="text-[11px] text-emerald-600 font-medium mt-2">
                      Facturado anualmente (ahorras ${(plan.price.monthly - plan.price.yearly) * 12})
                    </p>
                  )}

                  {/* Features List */}
                  <ul className="mt-8 space-y-4 text-sm text-zinc-600">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-x-3 leading-tight">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        ) : (
                          <span className="text-zinc-300 text-sm leading-[1] shrink-0 w-4 text-center mt-0.5">—</span>
                        )}
                        <span className={feature.included ? 'text-zinc-700' : 'text-zinc-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="mt-10">
                  <button
                    onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`block w-full rounded-xl py-3 text-center text-sm font-medium transition-colors ${
                      plan.featured
                        ? 'bg-zinc-900 text-white hover:bg-zinc-800'
                        : 'bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50'
                    }`}
                  >
                    {plan.ctaText}
                  </button>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Trust disclaimer */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 text-left">
          <Shield className="h-5 w-5 text-zinc-400 shrink-0" />
          <p className="text-xs text-zinc-500 font-medium">
            Garantía de Satisfacción de 14 Días. Si no ves valor, te devolvemos tu dinero.
          </p>
        </div>

      </div>
    </div>
  );
}
