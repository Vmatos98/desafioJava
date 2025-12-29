#!/bin/bash

echo "🔍 Debug do Frontend Container..."

# Verificar se o container está rodando
echo "📦 Status do container:"
docker ps | grep frontend

echo ""
echo "📁 Verificando arquivos no container:"
docker exec aprovados-frontend ls -la /usr/share/nginx/html/

echo ""
echo "📁 Verificando arquivos estáticos:"
docker exec aprovados-frontend ls -la /usr/share/nginx/html/static/ 2>/dev/null || echo "Pasta static não encontrada"

echo ""
echo "📁 Verificando JS:"
docker exec aprovados-frontend ls -la /usr/share/nginx/html/static/js/ 2>/dev/null || echo "Pasta js não encontrada"

echo ""
echo "📁 Verificando CSS:"
docker exec aprovados-frontend ls -la /usr/share/nginx/html/static/css/ 2>/dev/null || echo "Pasta css não encontrada"

echo ""
echo "🔧 Configuração do Nginx:"
docker exec aprovados-frontend cat /etc/nginx/conf.d/default.conf

echo ""
echo "📋 Logs do container:"
docker logs --tail=20 aprovados-frontend

echo ""
echo "🌐 Testando conectividade interna:"
docker exec aprovados-frontend curl -I http://localhost:8080 2>/dev/null || echo "Curl falhou"

echo ""
echo "💡 Dicas:"
echo "- Se os arquivos não estão em /usr/share/nginx/html/, o build falhou"
echo "- Se o Nginx não responde, verifique a configuração"
echo "- Se os arquivos estão lá mas retorna 404, problema de permissões"