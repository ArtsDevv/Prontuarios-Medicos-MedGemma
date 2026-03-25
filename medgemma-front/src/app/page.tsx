"use client";

import { useState, useEffect } from "react";
import { systemMetadata, initialPatient } from "./data";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false); // Novo: Controla se o chat está ativo
  const [patient, setPatient] = useState(initialPatient);
  const [message, setMessage] = useState(""); // Novo: Texto do input
  const [chatLog, setChatLog] = useState<{role: 'user' | 'ai', text: string}[]>([]); // Novo: Histórico

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Validação: Verifica se todos os campos do data.ts possuem conteúdo
  const isSidebarComplete = Object.values(patient).every(value => value.trim() !== "");

  const handleStartAnalysis = () => {
    if (isSidebarComplete) {
      setIsAnalyzing(true);
      // Opcional: Adiciona uma mensagem inicial automática da IA
      setChatLog([{ role: 'ai', text: `Dados de ${patient.name} recebidos. Como posso auxiliar na análise clínica hoje?` }]);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Adiciona mensagem do médico
    const newLogs = [...chatLog, { role: 'user' as const, text: message }];
    setChatLog(newLogs);
    setMessage("");

    // Simula resposta da IA após 1s
    setTimeout(() => {
      setChatLog(prev => [...prev, { role: 'ai' as const, text: "Analisando as informações fornecidas e comparando com padrões clínicos..." }]);
    }, 1000);
  };

  const dataAtual = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase();
  const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <main className="min-h-screen bg-[#1A3644] p-4 flex flex-col font-sans selection:bg-[#35596C]/20">
      
      {/* HEADER */}
      <header className="flex justify-between items-center text-white/80 text-[10px] font-bold px-2 mb-4 tracking-[0.2em] uppercase">
        <div className="flex gap-6">
          <span>{dataAtual}</span>
          <span>{horaAtual}</span>
        </div>
        <span>{systemMetadata.company}</span>
      </header>

      <div className="relative flex-1 bg-[#F8F9FA] rounded-[24px] overflow-hidden flex shadow-2xl shadow-black/30">
        
        {/* BOLHAS */}
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
              className="mt-10 group flex items-center gap-4 bg-[#35596C] text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-[#254150] transition-all"
            >
              Iniciar Painel
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        {/* TELA 2: DASHBOARD */}
        <div className={`absolute inset-0 z-20 flex w-full h-full bg-white/30 backdrop-blur-2xl transition-all duration-1000 delay-100 ease-out ${
            isStarted ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-12"
          }`}>
          
          <aside className="w-[340px] bg-white/60 border-r border-slate-200/50 flex flex-col shadow-xl flex-shrink-0">
            <div className="p-8 border-b border-slate-100/50">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-xl bg-[#35596C] flex items-center justify-center text-white shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#35596C] leading-none">{systemMetadata.title}</h2>
                  <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase mt-1">Intelligence {systemMetadata.version}</p>
                </div>
              </div>
            </div>

            <div className="p-8 flex-1 overflow-y-auto space-y-10 scrollbar-none">
              <section className="space-y-5">
                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-4"> IDENTIFICAÇÃO <span className="flex-1 h-[1px] bg-slate-100"></span> </h3>
                <div className="space-y-4">
                  <div className="group">
                    <label className="text-[9px] font-bold text-slate-400 ml-1 uppercase">Nome do Paciente</label>
                    <input type="text" value={patient.name} onChange={(e) => setPatient({...patient, name: e.target.value})} className="w-full bg-transparent border-b border-slate-200 py-2 text-sm text-slate-700 outline-none focus:border-[#35596C] transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="group"><label className="text-[9px] font-bold text-slate-400 ml-1 uppercase">Idade</label>
                      <input type="text" value={patient.age} onChange={(e) => setPatient({...patient, age: e.target.value})} className="w-full bg-transparent border-b border-slate-200 py-2 text-sm text-slate-700 outline-none focus:border-[#35596C]" />
                    </div>
                    <div className="group"><label className="text-[9px] font-bold text-slate-400 ml-1 uppercase">Sexo</label>
                      <input type="text" value={patient.sex} onChange={(e) => setPatient({...patient, sex: e.target.value})} className="w-full bg-transparent border-b border-slate-200 py-2 text-sm text-slate-700 outline-none focus:border-[#35596C]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="group"><label className="text-[9px] font-bold text-slate-400 ml-1 uppercase">CID</label>
                      <input type="text" value={patient.cid} onChange={(e) => setPatient({...patient, cid: e.target.value})} className="w-full bg-transparent border-b border-slate-200 py-2 text-sm text-slate-700 outline-none focus:border-[#35596C]" />
                    </div>
                    <div className="group"><label className="text-[9px] font-bold text-slate-400 ml-1 uppercase">Caso</label>
                      <input type="text" value={patient.complaint} onChange={(e) => setPatient({...patient, complaint: e.target.value})} className="w-full bg-transparent border-b border-slate-200 py-2 text-sm text-slate-700 outline-none focus:border-[#35596C]" />
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-5">
                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-4"> CONTEXTO <span className="flex-1 h-[1px] bg-slate-100"></span> </h3>
                <div className="group">
                  <label className="text-[9px] font-bold text-slate-400 ml-1 uppercase">Histórico e Comorbidades</label>
                  <textarea value={patient.history} onChange={(e) => setPatient({...patient, history: e.target.value})} rows={4} className="w-full mt-2 p-4 bg-white/40 border border-slate-100 rounded-2xl text-sm text-slate-600 outline-none focus:border-[#35596C]/20 transition-all resize-none shadow-inner" />
                </div>
              </section>

              {/* BOTÃO DE INICIAR ANÁLISE */}
              <div className="pt-4">
                <button 
                  disabled={!isSidebarComplete}
                  onClick={handleStartAnalysis}
                  className={`w-full py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg ${
                    isSidebarComplete 
                    ? "bg-[#35596C] text-white shadow-[#35596C]/20 hover:bg-[#254150] cursor-pointer" 
                    : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
                  }`}
                >
                  {isAnalyzing ? "Análise em Curso" : "Iniciar Análise"}
                </button>
              </div>
            </div>
          </aside>

          {/* CHAT AREA */}
          <main className="flex-1 flex flex-col z-10">
            <div className="h-[80px] flex justify-end items-center px-10">
              <button onClick={() => {setIsStarted(false); setIsAnalyzing(false); setChatLog([]);}} className="group flex items-center gap-3 text-[10px] font-black text-slate-300 hover:text-[#35596C] transition-all tracking-[0.2em] uppercase">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
                Encerrar Sessão
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-10 space-y-6 scrollbar-none">
              {!isAnalyzing ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 shadow-inner">
                    <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">Aguardando Dados Clínicos</h2>
                  <p className="text-slate-400 text-sm max-w-sm mt-2 font-light">Preencha todos os campos da sidebar para liberar a análise neural.</p>
                </div>
              ) : (
                <div className="max-w-4xl mx-auto py-10 space-y-6">
                  {chatLog.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                      <div className={`max-w-[80%] p-5 rounded-[20px] text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                        ? 'bg-[#35596C] text-white rounded-tr-none' 
                        : 'bg-white text-slate-600 border border-slate-100 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* INPUT AREA */}
            <div className="p-10">
              <div className={`max-w-4xl mx-auto flex items-center gap-4 bg-white/80 border border-slate-200 p-3 rounded-[24px] shadow-sm transition-all backdrop-blur-md ${!isAnalyzing && 'opacity-50 pointer-events-none'}`}>
                <button className="p-3 text-slate-300 hover:text-[#35596C] transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button>
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isAnalyzing ? "Descreva o caso clínico..." : "Aguardando início da análise..."} 
                  className="flex-1 bg-transparent outline-none text-sm text-slate-600 placeholder:text-slate-300 font-medium" 
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-[#35596C] text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
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