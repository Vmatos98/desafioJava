// Configuração da API baseada no ambiente

declare global {
  interface Window {
    APP_CONFIG?: {
      API_BASE_URL: string;
      ENDPOINTS: {
        APROVADOS: string;
      };
      DEBUG: boolean;
    };
  }
}

const getApiBaseUrl = (): string => {
  // Usar configuração dinâmica se disponível
  if (window.APP_CONFIG) {
    return window.APP_CONFIG.API_BASE_URL;
  }
  
  // Fallback para desenvolvimento local
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  
  // Fallback para produção
  return '';
};

export const API_BASE_URL = getApiBaseUrl();

// URLs completas da API
export const API_ENDPOINTS = {
  APROVADOS: window.APP_CONFIG?.ENDPOINTS.APROVADOS || '/api/aprovados',
} as const;

// Debug helper
export const isDebugMode = (): boolean => {
  return window.APP_CONFIG?.DEBUG || process.env.NODE_ENV === 'development';
};

// Log da configuração em modo debug
if (isDebugMode()) {
  console.log('🔧 API Configuration:', {
    API_BASE_URL,
    API_ENDPOINTS,
    NODE_ENV: process.env.NODE_ENV,
    WINDOW_CONFIG: window.APP_CONFIG
  });
}