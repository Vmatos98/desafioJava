# 🔧 Troubleshooting - Problemas de Frontend

## Frontend não renderiza - Arquivos 404

### 🔍 Sintomas:
- Página HTML carrega (200 OK)
- Arquivos JS/CSS retornam 404
- Console mostra erros de recursos não encontrados
- Página fica em branco

### 🎯 Causas Possíveis:

#### 1. **Build do React falhou**
**Teste:**
```bash
./test-build.sh
```

#### 2. **Arquivos não foram copiados para o container**
**Teste:**
```bash
./debug-frontend.sh
```

#### 3. **Nginx procura arquivos no local errado**
**Verificar:** nginx.conf deve apontar para `/usr/share/nginx/html`

#### 4. **Permissões incorretas**
**Solução:** Remover configurações de usuário não-root

### 🛠️ Soluções:

#### **Solução 1: Rebuild com debug**
```bash
# Use o Dockerfile com debug
docker-compose -f docker-compose.portainer.yml down
docker-compose -f docker-compose.portainer.yml up --build
```

#### **Solução 2: Verificar build local**
```bash
cd front
npm run build
ls -la build/static/
```

#### **Solução 3: Debug do container**
```bash
# Verificar arquivos no container
docker exec aprovados-frontend ls -la /usr/share/nginx/html/

# Verificar configuração do Nginx
docker exec aprovados-frontend nginx -t
```

#### **Solução 4: Usar Dockerfile simplificado**
O projeto inclui múltiplas versões:
- `Dockerfile` - Versão original
- `Dockerfile.simple` - Versão simplificada
- `Dockerfile.debug` - Versão com debug

### 📋 Checklist de Verificação:

- [ ] Build do React funciona localmente
- [ ] Arquivos estão em `/usr/share/nginx/html/` no container
- [ ] Nginx está configurado corretamente
- [ ] Não há problemas de permissões
- [ ] Container está expondo a porta correta (8080)

### 🚨 Problemas Comuns:

#### **Erro: "static/js/main.xxx.js 404"**
**Causa:** Arquivos JS não foram copiados ou estão no local errado
**Solução:** Verificar se o build foi bem-sucedido

#### **Erro: "config.js 404"**
**Causa:** Referência a arquivo inexistente no HTML
**Solução:** ✅ Já corrigido - arquivo removido

#### **Erro: "favicon.ico 404"**
**Causa:** Arquivo de ícone não existe
**Solução:** ✅ Placeholder criado

### 💡 Scripts de Debug:

```bash
# Testar build local
./test-build.sh

# Debug do container
./debug-frontend.sh

# Verificar API
./debug-api.sh
```

### 🔧 Configurações Testadas:

#### **Dockerfile.debug** (Recomendado para troubleshooting):
- Mostra conteúdo dos diretórios durante build
- Verifica se arquivos foram copiados
- Testa configuração do Nginx

#### **docker-compose.portainer.yml**:
- Usa Dockerfile.debug por padrão
- Porta 3001:8080
- Dependência do backend

### 🆘 Ainda com problemas?

1. Execute `./debug-frontend.sh` e compartilhe o resultado
2. Verifique se `./test-build.sh` funciona localmente
3. Confirme que o container está usando a porta correta
4. Verifique os logs: `docker logs aprovados-frontend`