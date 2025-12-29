#!/bin/bash

# Script para verificar portas disponíveis
echo "🔍 Verificando portas disponíveis..."

# Função para verificar se uma porta está em uso
check_port() {
    local port=$1
    if netstat -tuln 2>/dev/null | grep -q ":$port "; then
        echo "❌ Porta $port está em uso"
        return 1
    else
        echo "✅ Porta $port está disponível"
        return 0
    fi
}

# Portas sugeridas para testar
FRONTEND_PORTS=(3000 3001 3002 9001 9002)
BACKEND_PORTS=(8080 8090 8091 8092 9090 9091)

echo ""
echo "📡 Verificando portas para FRONTEND:"
for port in "${FRONTEND_PORTS[@]}"; do
    check_port $port
done

echo ""
echo "🔧 Verificando portas para BACKEND:"
for port in "${BACKEND_PORTS[@]}"; do
    check_port $port
done

echo ""
echo "💡 SUGESTÕES:"

# Encontrar primeira porta disponível para frontend
for port in "${FRONTEND_PORTS[@]}"; do
    if check_port $port >/dev/null 2>&1; then
        SUGGESTED_FRONTEND=$port
        break
    fi
done

# Encontrar primeira porta disponível para backend
for port in "${BACKEND_PORTS[@]}"; do
    if check_port $port >/dev/null 2>&1; then
        SUGGESTED_BACKEND=$port
        break
    fi
done

if [ ! -z "$SUGGESTED_FRONTEND" ] && [ ! -z "$SUGGESTED_BACKEND" ]; then
    echo "🎯 Use estas portas no seu .env:"
    echo "FRONTEND_PORT=$SUGGESTED_FRONTEND"
    echo "BACKEND_PORT=$SUGGESTED_BACKEND"
    
    # Criar arquivo .env automaticamente
    cat > .env.auto << EOF
# Portas disponíveis detectadas automaticamente
FRONTEND_PORT=$SUGGESTED_FRONTEND
BACKEND_PORT=$SUGGESTED_BACKEND

# Configurações do Backend
JAVA_OPTS=-Xmx1g -Xms512m
SPRING_PROFILES_ACTIVE=docker

# Nome do projeto
COMPOSE_PROJECT_NAME=aprovados
EOF
    
    echo ""
    echo "📝 Arquivo .env.auto criado com as configurações sugeridas!"
    echo "   Você pode renomear para .env ou usar com:"
    echo "   docker-compose --env-file .env.auto -f docker-compose.flexible.yml up"
else
    echo "⚠️  Não foi possível encontrar portas disponíveis automaticamente"
    echo "   Tente usar portas altas como 9001, 9091, etc."
fi

echo ""
echo "🐳 COMANDOS PARA PORTAINER:"
echo "1. Use docker-compose.portainer.yml (portas fixas 3001, 8091)"
echo "2. Ou use docker-compose.flexible.yml com variáveis de ambiente"