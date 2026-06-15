"use client";

import React, { useState, useEffect } from 'react';
import { Check, Sparkles, ShieldCheck, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AnimateIn } from './AnimateIn';

const countryAlerts = {
  paraguay: {
    entity: "MOPC",
    id: "DNCP #421.908",
    title: "Construcción y Mejoramiento de Caminos Rurales",
    budget: "USD ~615.000",
    match: "98%",
    reason: "2 proyectos viales similares registrados en últimos 3 años.",
    time: "Hoy, 8:15 AM",
    flag: "🇵🇾",
    color: "emerald"
  },
  peru: {
    entity: "Gobierno Regional de Arequipa",
    id: "LP-SM-4-2026",
    title: "Adquisición de Paneles Solares Fotovoltaicos",
    budget: "USD ~335.000",
    match: "95%",
    reason: "Certificación ISO 9001 válida y stock local verificado.",
    time: "Hoy, 7:42 AM",
    flag: "🇵🇪",
    color: "blue"
  },
  repdom: {
    entity: "Ministerio de Educación",
    id: "LPN-2026-0012",
    title: "Suministro de Mobiliario Escolar Nacional",
    budget: "USD ~310.000",
    match: "92%",
    reason: "Capacidad de entrega regional validada en contratos anteriores.",
    time: "Ayer, 4:30 PM",
    flag: "🇩🇴",
    color: "violet"
  }
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'paraguay' | 'peru' | 'repdom'>('paraguay');
  const [typing, setTyping] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    company_name: '',
    country: 'paraguay',
    contact_name: '',
    contact_role: '',
    email: '',
  });

  const setField = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.company_name) return;
    setStatus('loading');
    try {
      const { error } = await supabase.from('licitabot_waitlist').insert([{
        email: form.email,
        company_name: form.company_name,
        country: form.country,
        contact_name: form.contact_name,
        contact_role: form.contact_role,
      }]);
      if (error && error.code !== '23505') throw error;
      setStatus('success');
      setForm({ company_name: '', country: 'paraguay', contact_name: '', contact_role: '', email: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  useEffect(() => {
    setTyping(true);
    const timer = setTimeout(() => setTyping(false), 600);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const alert = countryAlerts[activeTab];

  return (
    <section className="relative overflow-hidden hero-bg min-h-screen flex flex-col justify-center pt-20 pb-16">
      
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-blue-500/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* === HERO MAIN GRID === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <AnimateIn direction="left">
            <div>
              {/* Launch badge */}
              <div className="inline-flex items-center gap-2.5 mb-8 badge-border rounded-full px-4 py-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span className="text-xs font-medium text-zinc-300 tracking-widest uppercase">Early Access · Cupos Limitados</span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 balance">
                <span className="gradient-text">Gana licitaciones</span>
                <br />
                <span className="gradient-text-emerald">desde WhatsApp.</span>
              </h1>

              <p className="text-lg text-zinc-400 leading-relaxed max-w-lg font-light mb-10">
                IA que lee los pliegos por ti en Paraguay, Perú y Rep. Dominicana. Te avisamos solo cuando cumples el 100% de los requisitos.
              </p>

              {/* Waitlist Form */}
              <div className="max-w-md">
                {status === 'success' ? (
                  <div className="stat-card px-5 py-4 rounded-2xl flex items-start gap-3">
                    <div className="bg-emerald-500/20 text-emerald-400 p-1.5 rounded-full mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">¡{form.contact_name || 'Tu empresa'} está en la lista!</h3>
                      <p className="text-sm text-zinc-400 mt-1">Te notificamos el día que abramos. Gracias por tu interés.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Row 1: Empresa + País */}
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={form.company_name}
                        onChange={e => setField('company_name', e.target.value)}
                        placeholder="Nombre de empresa *"
                        className="col-span-2 sm:col-span-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all"
                        required
                        disabled={status === 'loading'}
                      />
                      <select
                        value={form.country}
                        onChange={e => setField('country', e.target.value)}
                        className="col-span-2 sm:col-span-1 rounded-xl border border-white/10 bg-[#1f2c33] backdrop-blur-sm px-4 py-3 text-sm text-white focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all cursor-pointer"
                        disabled={status === 'loading'}
                        required
                      >
                        <option value="paraguay">Paraguay</option>
                        <option value="peru">Perú</option>
                        <option value="repdom">Rep. Dominicana</option>
                      </select>
                    </div>
                    {/* Row 2: Nombre contacto + Cargo */}
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={form.contact_name}
                        onChange={e => setField('contact_name', e.target.value)}
                        placeholder="Tu nombre"
                        className="col-span-2 sm:col-span-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all"
                        disabled={status === 'loading'}
                      />
                      <input
                        type="text"
                        value={form.contact_role}
                        onChange={e => setField('contact_role', e.target.value)}
                        placeholder="Cargo (Ej: Gerente)"
                        className="col-span-2 sm:col-span-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all"
                        disabled={status === 'loading'}
                      />
                    </div>
                    {/* Row 3: Email + Botón */}
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setField('email', e.target.value)}
                        placeholder="correo@empresa.com *"
                        className="flex-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all"
                        required
                        disabled={status === 'loading'}
                      />
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="rounded-xl bg-emerald-500 hover:bg-emerald-400 px-5 py-3 text-sm font-semibold text-zinc-900 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_28px_rgba(16,185,129,0.45)] whitespace-nowrap"
                      >
                        {status === 'loading' ? '...' : 'Unirme'}
                        {status === 'idle' && <ChevronRight className="h-4 w-4" />}
                      </button>
                    </div>
                  </form>
                )}
                {status === 'error' && (
                  <p className="text-red-400 text-xs mt-2 font-medium">Error al registrarte. Intenta de nuevo.</p>
                )}
                <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Sin spam, nunca.</span>
                  </div>
                  <div className="w-px h-3 bg-zinc-700" />
                  <span>Acceso anticipado gratuito.</span>
                </div>
              </div>

            </div>
          </AnimateIn>

          {/* ── RIGHT COLUMN: MOCKUP ── */}
          <AnimateIn direction="right" delay={250}>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[340px]">

                {/* Country Tab Switcher */}
                <div className="flex bg-white/5 border border-white/10 p-1 rounded-full mb-6 backdrop-blur-sm">
                  {(['paraguay', 'peru', 'repdom'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all duration-200 flex items-center justify-center gap-1.5 ${
                        activeTab === tab
                          ? 'bg-white/10 text-white shadow-sm border border-white/15'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      <span>{countryAlerts[tab].flag}</span>
                      <span className="hidden sm:inline">
                        {tab === 'paraguay' ? 'Paraguay' : tab === 'peru' ? 'Perú' : 'R. Dom'}
                      </span>
                    </button>
                  ))}
                </div>

                {/* iPhone Frame with glow */}
                <div className="animate-float phone-glow">
                  <div className="relative mx-auto w-full rounded-[44px] border-[7px] border-zinc-800 bg-zinc-950 aspect-[9/19.5] overflow-hidden ring-1 ring-white/5 shadow-2xl">
                    
                    {/* Dynamic Island */}
                    <div className="absolute top-2 inset-x-0 z-30 flex justify-center">
                      <div className="w-[90px] h-[28px] bg-black rounded-full flex items-center justify-center gap-2 px-3">
                        <div className="w-2 h-2 rounded-full bg-zinc-800" />
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-700" />
                      </div>
                    </div>

                    {/* Screen: dark WA style */}
                    <div className="h-full flex flex-col bg-[#111b21] pt-10 select-none">
                      
                      {/* WA Header */}
                      <div className="bg-[#1f2c33] px-4 py-3 flex items-center gap-3 border-b border-white/5">
                        <div className="relative">
                          <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#1f2c33] rounded-full shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                        </div>
                        <div>
                          <h4 className="text-[13px] font-semibold text-white leading-none">LicitaBot AI</h4>
                          <p className="text-[10px] text-emerald-400 mt-0.5">en línea</p>
                        </div>
                      </div>

                      {/* Chat area */}
                      <div className="flex-1 p-3 flex flex-col justify-end gap-2 overflow-hidden">
                        
                        {/* Timestamp */}
                        <div className="self-center text-[9px] text-zinc-500 bg-[#1f2c33] px-2.5 py-0.5 rounded-full">
                          {alert.time}
                        </div>

                        {/* Message bubble */}
                        <div className={`self-start max-w-[94%] bg-[#1f2c33] rounded-2xl rounded-tl-none p-3.5 border border-white/5 transition-all duration-300 ${typing ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}>
                          
                          {/* Badge */}
                          <div className="flex items-center gap-2 mb-2.5">
                            <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border border-emerald-500/20">
                              🔔 Nueva Alerta
                            </span>
                            <span className="text-xs">{alert.flag}</span>
                          </div>

                          <h3 className="text-[12px] font-semibold text-white leading-snug mb-1">{alert.title}</h3>
                          <p className="text-[9px] text-zinc-500 mb-3">{alert.entity} · {alert.id}</p>

                          {/* Data rows */}
                          <div className="space-y-1.5 mb-3">
                            <div className="flex justify-between items-center bg-white/5 px-2.5 py-1.5 rounded-lg">
                              <span className="text-[9px] text-zinc-400">Presupuesto</span>
                              <span className="text-[10px] font-bold text-white">{alert.budget}</span>
                            </div>
                            <div className="flex justify-between items-center bg-emerald-500/10 px-2.5 py-1.5 rounded-lg border border-emerald-500/20">
                              <span className="text-[9px] text-emerald-400 font-medium">Match IA</span>
                              <span className="text-[11px] font-extrabold text-emerald-400">{alert.match}</span>
                            </div>
                          </div>

                          <p className="text-[9px] text-zinc-400 leading-relaxed bg-white/3 px-2.5 py-2 rounded-lg border border-white/5">
                            <span className="text-white font-medium block mb-0.5">Análisis:</span>
                            {alert.reason}
                          </p>

                          <button className="w-full mt-3 bg-emerald-500 text-zinc-900 py-2 rounded-xl text-[10px] font-bold tracking-wide hover:bg-emerald-400 transition-colors shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                            Ver Pliegos →
                          </button>
                          <p className="text-[8px] text-zinc-600 text-right mt-1.5">✓✓ leído</p>
                        </div>

                        {/* Typing indicator */}
                        {typing && (
                          <div className="self-start bg-[#1f2c33] rounded-2xl rounded-tl-none px-4 py-3 border border-white/5 flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        )}
                      </div>

                      {/* Bottom bar */}
                      <div className="bg-[#1f2c33] px-4 py-3 flex items-center gap-2 border-t border-white/5">
                        <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2">
                          <span className="text-[10px] text-zinc-600">Mensaje</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
