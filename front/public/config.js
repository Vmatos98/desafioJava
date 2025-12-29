// Configuração dinâmica para diferentes ambientes
window.APP_CONFIG = {
  // Detectar automaticamente o ambiente
  API_BASE_URL: window.location.origin,
  
  // URLs da API
  ENDPOINTS: {
    APROVADOS: '/api/aprovados'
  },
  
  // Debug
  DEBUG: window.location.hostname === 'localhost'
};