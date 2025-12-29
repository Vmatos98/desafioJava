// Tipos específicos para aprovados em concursos

export interface Aprovado {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  concursosAprovados: string;
  nomeImagem?: string;
  caminhoImagem?: string;
  dataCadastro?: string;
}

export interface AprovadoFormData {
  nome: string;
  email: string;
  telefone: string;
  concursosAprovados: string;
}

export interface FormErrors {
  nome?: string;
  email?: string;
  telefone?: string;
  concursosAprovados?: string;
}

export interface Message {
  type: 'success' | 'error' | '';
  text: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: Aprovado;
}