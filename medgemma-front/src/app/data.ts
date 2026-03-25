export type PatientProfile = {
  name: string;
  age: string;
  sex: string;
  complaint: string;
  cid: string;
  history: string;
};

// 2. Os Dados Iniciais (O terreno real)
export const initialPatient: PatientProfile = {
  name: "João Silva",
  age: "45",
  sex: "Masculino",
  complaint: "Dor torácica",
  cid: "R07.4",
  history: "Paciente hipertenso, relata desconforto retroesternal há 2 horas.",
};

// 3. Metadados do Sistema (Opcional, mas ajuda a limpar o page.tsx)
export const systemMetadata = {
  title: "MedGemma",
  version: "1.5-PRO",
  company: "COMPANY NAME",
};