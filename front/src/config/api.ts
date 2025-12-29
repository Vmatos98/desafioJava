// Configuração da API baseada no ambiente

const getApiBaseUrl = (): string => {
  // Para produção (Docker), usar URL relativa para proxy do Nginx
  return '';
};

export const API_BASE_URL = getApiBaseUrl();

// URLs completas da API
export const API_ENDPOINTS = {
  APROVADOS: '/api/aprovados',
} as const;

// Debug helper
export const isDebugMode = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

// Log da configuração em modo debug
if (isDebugMode()) {
  console.log('🔧 API Configuration:', {
    API_BASE_URL,
    API_ENDPOINTS,
    NODE_ENV: process.env.NODE_ENV
  });
}