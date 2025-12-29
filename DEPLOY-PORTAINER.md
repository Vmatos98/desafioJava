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
- **Compose path:** Escolha uma das opções:
  - `docker-compose.portainer.yml` ✅ **Recomendado** (portas 3001, 8091)
  - `docker-compose.flexible.yml` (portas configuráveis via env)
  - `docker-compose.prod.yml` (produção completa)

#### 3. **Variáveis de Ambiente (Opcional)**

**Para docker-compose.portainer.yml:** Não precisa de variáveis

**Para docker-compose.flexible.yml:** Configure as portas
```env
FRONTEND_PORT=3002
BACKEND_PORT=8092
JAVA_OPTS=-Xmx1g -Xms512m
COMPOSE_PROJECT_NAME=aprovados
```

#### 4. **Deploy**
- Clique em **Deploy the stack**
- Aguarde o build e deploy dos containers

### 🌐 Acessar a Aplicação

Após o deploy bem-sucedido:

**Com docker-compose.portainer.yml:**
- **Frontend:** `http://seu-servidor:3001`
- **Backend API:** `http://seu-servidor:8091`

**Com docker-compose.flexible.yml:**
- **Frontend:** `http://seu-servidor:[FRONTEND_PORT]`
- **Backend API:** `http://seu-servidor:[BACKEND_PORT]`

### 🔧 Troubleshooting

#### ❌ Erro: "port is already allocated"
**Causa:** A porta já está sendo usada por outro serviço

**Soluções:**

1. **Usar portas alternativas (Recomendado):**
   ```yaml
   # No Portainer, use docker-compose.portainer.yml
   # Portas: Frontend 3001, Backend 8091
   ```

2. **Configurar portas customizadas:**
   ```env
   # Adicione estas variáveis no Portainer:
   FRONTEND_PORT=3002
   BACKEND_PORT=8092
   ```

3. **Verificar portas disponíveis:**
   ```bash
   # Se tiver acesso SSH ao servidor:
   ./check-ports.sh
   ```

4. **Usar docker-compose.flexible.yml:**
   - Permite configurar portas via variáveis
   - Mais flexível para diferentes ambientes

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

#### Docker Compose Files:
- `docker-compose.portainer.yml` ✅ **Recomendado para Portainer**
  - Portas fixas: Frontend 3001, Backend 8091
  - Configuração simples, sem variáveis
  
- `docker-compose.flexible.yml` 🔧 **Para portas customizadas**
  - Portas configuráveis via variáveis de ambiente
  - Ideal quando há conflitos de porta
  
- `docker-compose.prod.yml` 🚀 **Produção completa**
  - Health checks, logs rotativos
  - Configurações avançadas

#### Outros arquivos:
- `back/Dockerfile` - Build do backend Java
- `front/Dockerfile` - Build do frontend React
- `front/nginx.conf` - Configuração do Nginx
- `check-ports.sh` - Script para verificar portas disponíveis

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