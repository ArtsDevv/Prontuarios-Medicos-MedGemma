export default function Home() {
  // Coletando a data e hora atuais para simular o cabeçalho do seu design
  const dataAtual = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase();
  const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    // Fundo escuro (moldura) que pega a tela toda
    <main className="min-h-screen bg-[#1A3644] p-4 flex flex-col font-sans">
      
      {/* Cabeçalho superior (dentro da moldura escura) */}
      <header className="flex justify-between items-center text-white text-sm font-semibold px-2 mb-4 tracking-wider">
        <div className="flex gap-4">
          <span>DATE {dataAtual}</span>
          <span>{horaAtual}</span>
        </div>
        <span>COMPANY NAME</span>
      </header>

      {/* Cartão Branco Central (com as bolhas dentro) */}
      <div className="relative flex-1 bg-[#F8F9FA] rounded-[20px] overflow-hidden flex items-center shadow-2xl shadow-black/20">
        
        {/* Container das Bolhas */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>

        {/* Textos Principais (Alinhados à esquerda, mas centralizados na tela) */}
        <div className="relative z-10 pl-[10%] md:pl-[15%]">
          <h1 className="text-[#33566C] flex flex-col">
            <span className="text-6xl md:text-8xl font-bold tracking-tight mb-2">
              MedGemma:
            </span>
            <span className="text-5xl md:text-7xl font-light tracking-wide mb-2 opacity-90">
              Assistente
            </span>
            <span className="text-5xl md:text-7xl font-light tracking-wide opacity-90">
              Clínico IA
            </span>
          </h1>
        </div>

      </div>
    </main>
  );
}