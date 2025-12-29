#!/bin/bash

echo "🔨 Testando build do frontend..."

# Ir para o diretório do frontend
cd front

echo "📦 Instalando dependências..."
npm install

echo "🏗️ Fazendo build..."
npm run build

echo "📋 Verificando arquivos gerados:"
ls -la build/

echo "📋 Verificando arquivos estáticos:"
ls -la build/static/

echo "📋 Verificando JS:"
ls -la build/static/js/

echo "📋 Verificando CSS:"
ls -la build/static/css/

echo ""
echo "✅ Build concluído!"
echo "💡 Se os arquivos estão presentes, o problema pode ser no Docker"

cd ..