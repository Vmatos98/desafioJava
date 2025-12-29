#!/bin/bash

# Script de Deploy para Servidor
echo "🚀 Iniciando deploy da aplicação Aprovados em Concursos..."

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker-compose -f docker-compose.prod.yml down

# Remover imagens antigas (opcional)
read -p "🗑️  Deseja remover imagens antigas? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🧹 Removendo imagens antigas..."
    docker system prune -f
    docker image prune -f
fi

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp .env.example .env
    echo "✏️  Por favor, edite o arquivo .env com suas configurações antes de continuar."
    read -p "Pressione Enter para continuar após editar o .env..."
fi

# Build e start dos containers
echo "🔨 Construindo e iniciando containers..."
docker-compose -f docker-compose.prod.yml up --build -d

# Aguardar containers ficarem saudáveis
echo "⏳ Aguardando containers ficarem saudáveis..."
sleep 30

# Verificar status dos containers
echo "📊 Status dos containers:"
docker-compose -f docker-compose.prod.yml ps

# Verificar logs
echo "📋 Últimos logs do backend:"
docker-compose -f docker-compose.prod.yml logs --tail=20 backend

echo "📋 Últimos logs do frontend:"
docker-compose -f docker-compose.prod.yml logs --tail=20 frontend

# Informações finais
echo ""
echo "✅ Deploy concluído!"
echo "🌐 Frontend: http://localhost:${FRONTEND_PORT:-80}"
echo "🔧 Backend: http://localhost:${BACKEND_PORT:-8080}"
echo ""
echo "📝 Comandos úteis:"
echo "   Ver logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "   Parar: docker-compose -f docker-compose.prod.yml down"
echo "   Reiniciar: docker-compose -f docker-compose.prod.yml restart"
echo ""