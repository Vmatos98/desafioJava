#!/bin/bash

echo "🔍 Testando conectividade da API..."

# Verificar se os containers estão rodando
echo ""
echo "📦 Status dos containers:"
docker ps | grep -E "(aprovados|backend|frontend)"

echo ""
echo "🌐 Testando conectividade:"

# Testar backend diretamente
echo "1. Testando backend diretamente (porta 8091):"
curl -s -o /dev/null -w "%{http_code}" http://localhost:8091/api/aprovados
if [ $? -eq 0 ]; then
    echo " ✅ Backend acessível"
else
    echo " ❌ Backend não acessível"
fi

# Testar frontend
echo "2. Testando frontend (porta 3001):"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001
if [ $? -eq 0 ]; then
    echo " ✅ Frontend acessível"
else
    echo " ❌ Frontend não acessível"
fi

# Testar proxy do frontend para API
echo "3. Testando proxy frontend -> backend:"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/aprovados
if [ $? -eq 0 ]; then
    echo " ✅ Proxy funcionando"
else
    echo " ❌ Proxy não funcionando"
fi

echo ""
echo "🔧 Logs dos containers:"
echo "Backend:"
docker logs --tail=10 aprovados-backend 2>/dev/null || echo "Container backend não encontrado"

echo ""
echo "Frontend:"
docker logs --tail=10 aprovados-frontend 2>/dev/null || echo "Container frontend não encontrado"

echo ""
echo "💡 Dicas:"
echo "- Se o backend não estiver acessível, verifique se está rodando na porta 8091"
echo "- Se o proxy não funcionar, verifique a configuração do Nginx"
echo "- Verifique se os containers estão na mesma rede Docker"