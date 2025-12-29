# 🔧 Troubleshooting - Problemas de API

## Erro 404 - API não encontrada

### 🔍 Sintomas:
- Frontend tenta acessar `http://localhost:3001/api/aprovados`
- Retorna erro 404 (Not Found)
- Requisições não chegam ao backend

### 🎯 Causas Possíveis:

#### 1. **Proxy do Nginx não configurado**
**Solução:** Verificar `front/nginx.conf`
```nginx
location /api/ {
    proxy_pass http://backend:8080/api/;
    # ... outras configurações
}
```

#### 2. **Containers não estão na mesma rede**
**Solução:** Verificar docker-compose.yml
```yaml
networks:
  - aprovados-network
```

#### 3. **Backend não está rodando**
**Teste:**
```bash
curl http://localhost:8091/api/aprovados
```

#### 4. **Nome do serviço incorreto**
**Verificar:** O nome `backend` no nginx.conf deve corresponder ao service no docker-compose

### 🛠️ Soluções:

#### **Solução 1: Rebuild dos containers**
```bash
docker-compose -f docker-compose.portainer.yml down
docker-compose -f docker-compose.portainer.yml up --build
```

#### **Solução 2: Verificar logs**
```bash
# Logs do frontend (Nginx)
docker logs aprovados-frontend

# Logs do backend
docker logs aprovados-backend
```

#### **Solução 3: Testar conectividade**
```bash
# Execute o script de debug
./debug-api.sh
```

#### **Solução 4: Testar manualmente**
```bash
# 1. Testar backend diretamente
curl http://localhost:8091/api/aprovados

# 2. Testar proxy do frontend
curl http://localhost:3001/api/aprovados

# 3. Entrar no container do frontend
docker exec -it aprovados-frontend sh
# Dentro do container:
curl http://backend:8080/api/aprovados
```

### 🔧 Configurações por Ambiente:

#### **Desenvolvimento Local (npm start):**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`
- Proxy: Configurado no `package.json`

#### **Docker (Portainer):**
- Frontend: `http://localhost:3001`
- Backend: `http://localhost:8091`
- Proxy: Configurado no Nginx

### 📋 Checklist de Verificação:

- [ ] Backend está rodando na porta correta
- [ ] Frontend está rodando na porta correta
- [ ] Containers estão na mesma rede Docker
- [ ] Nginx está configurado com proxy correto
- [ ] Nome do serviço no nginx.conf corresponde ao docker-compose
- [ ] CORS está configurado no backend
- [ ] Não há conflito de portas

### 🚨 Problemas Comuns:

#### **Erro: "CORS policy"**
**Causa:** Backend não permite requisições do frontend
**Solução:** Verificar `CorsConfig.java` no backend

#### **Erro: "Connection refused"**
**Causa:** Backend não está acessível
**Solução:** Verificar se o container backend está rodando

#### **Erro: "502 Bad Gateway"**
**Causa:** Nginx não consegue conectar ao backend
**Solução:** Verificar nome do serviço e rede Docker

### 💡 Dicas:

1. **Use o script debug:** `./debug-api.sh`
2. **Verifique os logs:** Sempre olhe os logs dos containers
3. **Teste isoladamente:** Teste backend e frontend separadamente
4. **Verifique a rede:** Containers devem estar na mesma rede
5. **Rebuild quando necessário:** Após mudanças no Nginx, faça rebuild

### 🆘 Ainda com problemas?

1. Execute `./debug-api.sh` e compartilhe o resultado
2. Verifique os logs: `docker logs aprovados-frontend` e `docker logs aprovados-backend`
3. Teste a conectividade manualmente com curl
4. Verifique se não há outros serviços usando as mesmas portas