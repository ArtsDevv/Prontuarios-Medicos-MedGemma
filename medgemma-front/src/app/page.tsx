"use client";

import { useState, useEffect, useRef } from "react";
import { systemMetadata, initialPatient } from "./data";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [patient, setPatient] = useState(initialPatient);
  
  // Estados do Chat e Imagens
  const [message, setMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState<{file: File, preview: string}[]>([]);
  const [chatLog, setChatLog] = useState<{role: 'user' | 'ai', text: string, images?: string[]}[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isSidebarComplete = Object.values(patient).every(value => value.trim() !== "");

  // Manipulação de Arquivos
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setSelectedImages(prev => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleStartAnalysis = () => {
    if (isSidebarComplete) {
      setIsAnalyzing(true);
      setChatLog([{ role: 'ai', text: `Dados de ${patient.name} recebidos. Por favor, anexe os exames de imagem ou descreva os sintomas para iniciarmos a análise.` }]);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() && selectedImages.length === 0) return;
    
    // Captura as URLs das imagens para o log do chat
    const imageUrls = selectedImages.map(img => img.preview);

    const newLogs = [
      ...chatLog, 
      { role: 'user' as const, text: message, images: imageUrls }
    ];
    
    setChatLog(newLogs);
    setMessage("");
    setSelectedImages([]); // Limpa os anexos após enviar

    // Simula resposta da IA focada em visão computacional
    setTimeout(() => {
      setChatLog(prev => [...prev, { 
        role: 'ai' as const, 
        text: imageUrls.length > 0 
          ? "Recebi as imagens. Iniciando segmentação de estruturas e busca por anomalias texturais..." 
          : "Entendido. Processando as informações clínicas fornecidas..." 
      }]);
    }, 1200);
  };

  const dataAtual = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase();
  const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <main className="min-h-screen bg-[#1A3644] p-4 flex flex-col font-sans selection:bg-[#35596C]/20">
      
      <header className="flex justify-between items-center text-white/80 text-[10px] font-bold px-2 mb-4 tracking-[0.2em] uppercase">
        <div className="flex gap-6"><span>{dataAtual}</span><span>{horaAtual}</span></div>
        <span>{systemMetadata.company}</span>
      </header>

      <div className="relative flex-1 bg-[#F8F9FA] rounded-[24px] overflow-hidden flex shadow-2xl shadow-black/30">
        
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="bubble"></div><div className="bubble"></div><div className="bubble"></div>
        </div>

        {/* TELA 1: LANDING */}
        <div className={`absolute inset-0 z-10 flex flex-col justify-center pl-[10%] md:pl-[12%] transition-all duration-1000 ease-in-out ${isStarted ? "opacity-0 pointer-events-none scale-95 blur-xl" : "opacity-100"}`}>
          <div className="flex flex-col items-start space-y-2">
            <h1 className="text-[#35596C] flex flex-col leading-[0.85] font-[family-name:var(--font-plus-jakarta)]">
              <span className="text-6xl md:text-[150px] font-semibold tracking-tighter">{systemMetadata.title}:</span>
              <span className="text-5xl md:text-[150px] font-normal tracking-tighter">Assistente</span>
              <span className="text-5xl md:text-[150px] font-light tracking-tighter">Clínico IA</span>
            </h1>
            <button onClick={() => setIsStarted(true)} className="mt-10 group flex items-center gap-4 bg-[#35596C] text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-[#254150] transition-all">
              Iniciar Painel <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        {/* TELA 2: DASHBOARD */}
        <div className={`absolute inset-0 z-20 flex w-full h-full bg-white/30 backdrop-blur-2xl transition-all duration-1000 delay-100 ease-out ${isStarted ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-12"}`}>
          
          <aside className="w-[340px] bg-white/60 border-r border-slate-200/50 flex flex-col shadow-xl flex-shrink-0">
            <div className="p-8 border-b border-slate-100/50">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-xl bg-[#35596C] flex items-center justify-center text-white shadow-lg"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
                <div><h2 className="text-xl font-bold text-[#35596C] leading-none">{systemMetadata.title}</h2><p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase mt-1">Intelligence {systemMetadata.version}</p></div>
              </div>
            </div>

            <div className="p-8 flex-1 overflow-y-auto space-y-10 scrollbar-none">
              {/* Seção Identificação */}
              <section className="space-y-5">
                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-4"> IDENTIFICAÇÃO <span className="flex-1 h-[1px] bg-slate-100"></span> </h3>
                <div className="space-y-4">
                  <div className="group"><label className="text-[9px] font-bold text-slate-400 ml-1 uppercase">Nome do Paciente</label>
                    <input type="text" value={patient.name} onChange={(e) => setPatient({...patient, name: e.target.value})} className="w-full bg-transparent border-b border-slate-200 py-2 text-sm text-slate-700 outline-none focus:border-[#35596C] transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="group"><label className="text-[9px] font-bold text-slate-400 ml-1 uppercase">Idade</label>
                      <input type="text" value={patient.age} onChange={(e) => setPatient({...patient, age: e.target.value})} className="w-full bg-transparent border-b border-slate-200 py-2 text-sm text-slate-700 outline-none" />
                    </div>
                    <div className="group"><label className="text-[9px] font-bold text-slate-400 ml-1 uppercase">Sexo</label>
                      <input type="text" value={patient.sex} onChange={(e) => setPatient({...patient, sex: e.target.value})} className="w-full bg-transparent border-b border-slate-200 py-2 text-sm text-slate-700 outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="group"><label className="text-[9px] font-bold text-slate-400 ml-1 uppercase">CID</label>
                      <input type="text" value={patient.cid} onChange={(e) => setPatient({...patient, cid: e.target.value})} className="w-full bg-transparent border-b border-slate-200 py-2 text-sm text-slate-700 outline-none" />
                    </div>
                    <div className="group"><label className="text-[9px] font-bold text-slate-400 ml-1 uppercase">Caso</label>
                      <input type="text" value={patient.complaint} onChange={(e) => setPatient({...patient, complaint: e.target.value})} className="w-full bg-transparent border-b border-slate-200 py-2 text-sm text-slate-700 outline-none" />
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

              <div className="pt-4">
                <button disabled={!isSidebarComplete} onClick={handleStartAnalysis} className={`w-full py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg ${isSidebarComplete ? "bg-[#35596C] text-white shadow-[#35596C]/20 hover:bg-[#254150] cursor-pointer" : "bg-slate-100 text-slate-300 cursor-not-allowed"}`}>
                  {isAnalyzing ? "Análise em Curso" : "Iniciar Análise"}
                </button>
              </div>
            </div>
          </aside>

          {/* ÁREA DO CHAT */}
          <main className="flex-1 flex flex-col z-10">
            <div className="h-[80px] flex justify-end items-center px-10">
              <button onClick={() => {setIsStarted(false); setIsAnalyzing(false); setChatLog([]);}} className="group flex items-center gap-3 text-[10px] font-black text-slate-300 hover:text-[#35596C] transition-all tracking-[0.2em] uppercase">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg> Encerrar Sessão
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
                <div className="max-w-4xl mx-auto py-10 space-y-8">
                  {chatLog.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                      <div className={`max-w-[80%] space-y-3`}>
                        <div className={`p-5 rounded-[20px] text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-[#35596C] text-white rounded-tr-none' : 'bg-white text-slate-600 border border-slate-100 rounded-tl-none'}`}>
                          {msg.images && msg.images.length > 0 && (
                            <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                              {msg.images.map((url, i) => (
                                <img key={i} src={url} className="h-40 rounded-lg border border-white/20 shadow-sm" alt="Exame enviado" />
                              ))}
                            </div>
                          )}
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* INPUT AREA COM PREVIEW DE IMAGEM */}
            <div className="p-10">
              <div className="max-w-4xl mx-auto space-y-4">
                
                {/* Preview de Imagens selecionadas */}
                {selectedImages.length > 0 && (
                  <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {selectedImages.map((img, i) => (
                      <div key={i} className="relative group">
                        <img src={img.preview} className="w-20 h-20 object-cover rounded-xl border-2 border-white shadow-md" alt="Preview" />
                        <button onClick={() => removeImage(i)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-lg">✕</button>
                      </div>
                    ))}
                  </div>
                )}

                <div className={`flex items-center gap-4 bg-white/80 border border-slate-200 p-3 rounded-[24px] shadow-sm transition-all backdrop-blur-md ${!isAnalyzing && 'opacity-50 pointer-events-none'}`}>
                  {/* Botão de Anexo (Clip) */}
                  <input type="file" ref={fileInputRef} className="hidden" multiple accept="image/*" onChange={handleFileSelect} />
                  <button onClick={() => fileInputRef.current?.click()} className="p-3 text-slate-300 hover:text-[#35596C] transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                  </button>
                  
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={isAnalyzing ? "Descreva o caso clínico..." : "Aguardando início da análise..."} 
                    className="flex-1 bg-transparent outline-none text-sm text-slate-600 placeholder:text-slate-300 font-medium" 
                  />
                  
                  <button onClick={handleSendMessage} className="bg-[#35596C] text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 2 11 13M22 2 15 22 11 13 2 9l20-7z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}