export default function Home() {
  const dataAtual = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase();
  const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <main className="min-h-screen bg-[#1A3644] p-4 flex flex-col font-sans">
      
      {/* Cabeçalho superior */}
      <header className="flex justify-between items-center text-white text-sm font-semibold px-2 mb-4 tracking-wider">
        <div className="flex gap-4">
          <span>DATE {dataAtual}</span>
          <span>{horaAtual}</span>
        </div>
        <span>COMPANY NAME</span>
      </header>

      {/* Cartão Branco Central */}
      <div className="relative flex-1 bg-[#F8F9FA] rounded-[20px] overflow-hidden flex items-center shadow-2xl shadow-black/20">
        
        {/* Bolhas Flutuantes (O CSS continua no globals.css) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>

        {/* Textos Principais com a tipografia do Figma */}
        <div className="relative z-10 pl-[10%] md:pl-[15%]">
          {/* Cor exata do Figma e Line Height 110% (leading-[1.1]) */}
          <h1 className="text-[#35596C] flex flex-col leading-[1.1]">
            
            {/* MedGemma: SemiBold (600) */}
            <span className="text-6xl md:text-[8rem] lg:text-[10rem] font-semibold tracking-tight">
              MedGemma:
            </span>
            
            {/* Assistente Clínico IA: Regular (400) */}
            <span className="text-5xl md:text-[6rem] lg:text-[8rem] font-normal tracking-tight mt-[-2%]">
              Assistente
            </span>
            <span className="text-5xl md:text-[6rem] lg:text-[8rem] font-normal tracking-tight">
              Clínico IA
            </span>

          </h1>
        </div>

      </div>
    </main>
  );
}