export interface Paciente {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  sexo: 'Masculino' | 'Feminino' | 'Outro';
}

export interface Diagnostico {
  id: string;
  pacienteId: string;
  sintomas: string;
  imagemUrl?: string; // O "?" significa que não é obrigatório (nem sempre terá raio-x)
  resultadoIa: string;
  nivelUrgencia: 'Baixo' | 'Médio' | 'Alto';
  data: string;
}