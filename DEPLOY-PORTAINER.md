# 🐳 Deploy com Portainer

## Guia para deploy usando Portainer

### 📋 Pré-requisitos
- Portainer instalado e funcionando
- Acesso ao repositório Git
- Docker Engine no servidor

### 🚀 Passos para Deploy

#### 1. **Criar Stack no Portainer**
1. Acesse o Portainer
2. Vá em **Stacks** → **Add Stack**
3. Escolha **Repository** como método

#### 2. **Configurar Repositório**
- **Repository URL:** `https://github.com/seu-usuario/seu-repositorio.git`
- **Reference:** `main` (ou sua branch principal)
- **Compose path:** `docker-compose.portainer.yml`

#### 3. **Variáveis de Ambiente (Opcional)**
```env
FRONTEND_PORT=3000
BACKEND_PORT=8090
JAVA_OPTS=-Xmx1g -Xms512m
```

#### 4. **Deploy**
- Clique em **Deploy the stack**
- Aguarde o build e deploy dos containers

### 🌐 Acessar a Aplicação

Após o deploy bem-sucedido:
- **Frontend:** `http://seu-servidor:3000`
- **Backend API:** `http://seu-servidor:8090`

### 🔧 Troubleshooting

#### Erro: "openjdk:17-jdk-slim: not found"
✅ **Solucionado!** Agora usamos `eclipse-temurin:17-jdk-alpine`

#### Erro de Build do Frontend
- Verifique se o Node.js está disponível
- Confirme que o `package.json` está correto

#### Erro de Conexão Backend/Frontend
- Verifique se os containers estão na mesma rede
- Confirme as portas no docker-compose

### 📊 Monitoramento

#### Logs dos Containers
```bash
# Via Portainer: Stacks → sua-stack → Containers → Logs

# Via CLI (se tiver acesso SSH):
docker logs aprovados-backend
docker logs aprovados-frontend
```

#### Health Checks
- Backend: `http://localhost:8090/api/aprovados`
- Frontend: `http://localhost:3000`

### 🔄 Atualização

Para atualizar a aplicação:
1. Faça push das alterações para o repositório
2. No Portainer: **Stacks** → sua stack → **Editor**
3. Clique em **Pull and redeploy**

### 📝 Arquivos Importantes

- `docker-compose.portainer.yml` - Configuração simplificada para Portainer
- `back/Dockerfile` - Build do backend Java
- `front/Dockerfile` - Build do frontend React
- `front/nginx.conf` - Configuração do Nginx

### 🎯 Dicas de Produção

1. **Portas:** Use portas não padrão para evitar conflitos
2. **Volumes:** Os dados ficam persistentes nos volumes Docker
3. **Logs:** Configure rotação de logs para evitar enchimento de disco
4. **Backup:** Faça backup dos volumes regularmente

### 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs dos containers
2. Confirme se as imagens foram buildadas corretamente
3. Teste a conectividade de rede entre containers
4. Verifique se as portas estão disponíveis no servidor