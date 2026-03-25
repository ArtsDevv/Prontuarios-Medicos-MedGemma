"use client";

import { useState, useEffect } from "react";
import { systemMetadata, initialPatient } from "./data";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [patient, setPatient] = useState(initialPatient);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const dataAtual = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase();
  const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <main className="min-h-screen bg-[#1A3644] p-4 flex flex-col font-sans selection:bg-[#35596C]/20">
      
      {/* HEADER SUPERIOR */}
      <header className="flex justify-between items-center text-white/80 text-[10px] font-bold px-2 mb-4 tracking-[0.2em] uppercase">
        <div className="flex gap-6">
          <span>{dataAtual}</span>
          <span>{horaAtual}</span>
        </div>
        <span>{systemMetadata.company}</span>
      </header>

      <div className="relative flex-1 bg-[#F8F9FA] rounded-[24px] overflow-hidden flex shadow-2xl shadow-black/30">
        
        {/* BACKGROUND BOLHAS */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="bubble"></div><div className="bubble"></div><div className="bubble"></div>
        </div>

        {/* TELA 1: LANDING */}
        <div className={`absolute inset-0 z-10 flex flex-col justify-center pl-[10%] md:pl-[12%] transition-all duration-1000 ease-in-out ${
            isStarted ? "opacity-0 pointer-events-none scale-95 blur-xl" : "opacity-100"
          }`}>
          <div className="flex flex-col items-start space-y-2">
            <h1 className="text-[#35596C] flex flex-col leading-[0.85] font-[family-name:var(--font-plus-jakarta)] text-left">
              <span className="text-6xl md:text-[150px] font-semibold tracking-tighter">{systemMetadata.title}:</span>
              <span className="text-5xl md:text-[150px] font-normal tracking-tighter">Assistente</span>
              <span className="text-5xl md:text-[150px] font-light tracking-tighter">Clínico IA</span>
            </h1>
            <button 
              onClick={() => setIsStarted(true)}
              className="mt-10 group flex items-center gap-4 bg-[#35596C] text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-[#254150] transition-all hover:shadow-2xl hover:shadow-[#35596C]/40"
            >
              Iniciar Painel
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        {/* TELA 2: PAINEL PRINCIPAL */}
        <div className={`absolute inset-0 z-20 flex w-full h-full bg-white/30 backdrop-blur-2xl transition-all duration-1000 delay-100 ease-out ${
            isStarted ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-12"
          }`}>
          
          <aside className="w-[340px] bg-white/60 border-r border-slate-200/50 flex flex-col shadow-xl flex-shrink-0">
            <div className="p-8 border-b border-slate-100/50">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-xl bg-[#35596C] flex items-center justify-center text-white shadow-lg relative z-10">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#35596C] leading-none">{systemMetadata.title}</h2>
                  <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase mt-1 relative z-10">Intelligence {systemMetadata.version}</p>
                </div>
              </div>
            </div>

            <div className="p-8 flex-1 overflow-y-auto space-y-10 scrollbar-none relative z-10">
              
              {/* SEÇÃO IDENTIFICAÇÃO (UNIFICADA E CORRIGIDA) */}
              <section className="space-y-5">
                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-4">
                  IDENTIFICAÇÃO <span className="flex-1 h-[1px] bg-slate-100"></span>
                </h3>
                
                <div className="space-y-4">
                  <div className="group">
                    <label className="text-[9px] font-bold text-slate-400 ml-1 uppercase transition-colors group-focus-within:text-[#35596C]">Nome do Paciente</label>
                    <input type="text" value={patient.name} onChange={(e) => setPatient({...patient, name: e.target.value})} className="w-full bg-transparent border-b border-slate-200 py-2 text-sm text-slate-700 outline-none focus:border-[#35596C] transition-all" />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="group">
                      <label className="text-[9px] font-bold text-slate-400 ml-1 uppercase">Idade</label>
                      <input type="text" value={patient.age} onChange={(e) => setPatient({...patient, age: e.target.value})} className="w-full bg-transparent border-b border-slate-200 py-2 text-sm text-slate-700 outline-none focus:border-[#35596C]" />
                    </div>
                    <div className="group">
                      <label className="text-[9px] font-bold text-slate-400 ml-1 uppercase">Sexo</label>
                      <input type="text" value={patient.sex} onChange={(e) => setPatient({...patient, sex: e.target.value})} className="w-full bg-transparent border-b border-slate-200 py-2 text-sm text-slate-700 outline-none focus:border-[#35596C]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="group">
                      <label className="text-[9px] font-bold text-slate-400 ml-1 uppercase">CID</label>
                      <input type="text" value={patient.cid} onChange={(e) => setPatient({...patient, cid: e.target.value})} className="w-full bg-transparent border-b border-slate-200 py-2 text-sm text-slate-700 outline-none focus:border-[#35596C]" />
                    </div>
                    <div className="group">
                      <label className="text-[9px] font-bold text-slate-400 ml-1 uppercase">Caso</label>
                      <input type="text" value={patient.complaint} onChange={(e) => setPatient({...patient, complaint: e.target.value})} className="w-full bg-transparent border-b border-slate-200 py-2 text-sm text-slate-700 outline-none focus:border-[#35596C]" />
                    </div>
                  </div>
                </div>
              </section>

              {/* SEÇÃO CONTEXTO */}
              <section className="space-y-5">
                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-4">
                  CONTEXTO <span className="flex-1 h-[1px] bg-slate-100"></span>
                </h3>
                <div className="group">
                    <label className="text-[9px] font-bold text-slate-400 ml-1 uppercase transition-colors group-focus-within:text-[#35596C]">Histórico e Comorbidades</label>
                    <textarea 
                      value={patient.history} 
                      onChange={(e) => setPatient({...patient, history: e.target.value})} 
                      rows={6} 
                      className="w-full mt-2 p-4 bg-white/40 border border-slate-100 rounded-2xl text-sm text-slate-600 leading-relaxed outline-none focus:border-[#35596C]/20 focus:bg-white transition-all resize-none shadow-inner" 
                    />
                </div>
              </section>
            </div>

            {/* RODAPÉ SIDEBAR */}
            <div className="p-6 bg-slate-50/50 border-t border-slate-100 relative z-10">
               <div className="flex items-center justify-between opacity-40 grayscale text-[9px] font-mono tracking-tighter">
                  <span>NODE: BR-SAO-01</span>
                  <span>STATUS: SECURE</span>
               </div>
            </div>
          </aside>

          {/* ÁREA DO CHAT */}
          <main className="flex-1 flex flex-col z-10">
            <div className="h-[80px] flex justify-end items-center px-10">
              <button onClick={() => setIsStarted(false)} className="group flex items-center gap-3 text-[10px] font-black text-slate-300 hover:text-[#35596C] transition-all tracking-[0.2em] uppercase relative z-10">
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
                Encerrar Sessão
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center relative z-10">
              <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 shadow-inner">
                <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">Análise Assistida por IA</h2>
              <p className="text-slate-400 text-sm max-w-sm mt-2 font-light leading-relaxed">Envie uma imagem médica ou descreva achados clínicos para iniciar o processamento neural.</p>
            </div>

            <div className="p-10 relative z-10">
              <div className="max-w-4xl mx-auto flex items-center gap-4 bg-white/80 border border-slate-200 p-3 rounded-[24px] shadow-sm focus-within:shadow-xl focus-within:border-[#35596C]/20 transition-all backdrop-blur-md">
                <button className="p-3 text-slate-300 hover:text-[#35596C] transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button>
                <input type="text" placeholder="Descreva o caso clínico..." className="flex-1 bg-transparent outline-none text-sm text-slate-600 placeholder:text-slate-300 font-medium" />
                <button className="bg-[#35596C] text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#35596C]/30">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 2 11 13M22 2 15 22 11 13 2 9l20-7z"/></svg>
                </button>
              </div>
            </div>
          </main>
        </div>

      </div>
    </main>
  );
}