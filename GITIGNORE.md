# 📝 Documentação do .gitignore

## Estrutura dos arquivos .gitignore

Este projeto possui múltiplos arquivos `.gitignore` organizados hierarquicamente:

### 📁 Raiz do projeto (`.gitignore`)
- **Escopo:** Configurações globais para todo o projeto
- **Inclui:** Arquivos de ambiente, Docker, IDEs, SO, segurança

### 📁 Backend (`back/.gitignore`)
- **Escopo:** Específico para Java Spring Boot
- **Inclui:** Maven, JAR files, H2 database, uploads, logs

### 📁 Frontend (`front/.gitignore`)
- **Escopo:** Específico para React + TypeScript
- **Inclui:** Node modules, builds, cache, TypeScript

## 🔒 Arquivos de Segurança Ignorados

### Credenciais e Chaves
- `*.pem`, `*.key`, `*.p12`, `*.jks`
- `credentials.json`, `service-account.json`
- `auth.json`

### Configurações Sensíveis
- `.env*` (todas as variações)
- `application-local.properties`
- `config/local/`

## 📦 Arquivos de Build Ignorados

### Backend
- `target/` (Maven)
- `build/` (Gradle)
- `*.jar`, `*.war`

### Frontend
- `node_modules/`
- `build/`, `dist/`
- `.cache/`

## 🗃️ Dados Temporários Ignorados

### Banco de Dados
- `*.db`, `*.trace.db`
- `data/`

### Uploads
- `uploads/` (conteúdo)
- `files/`, `temp/`

### Logs
- `logs/`, `*.log`

## 💡 Boas Práticas

### ✅ O que DEVE ser commitado:
- Código fonte
- Arquivos de configuração (sem dados sensíveis)
- Documentação
- Scripts de deploy
- `.gitkeep` para diretórios necessários

### ❌ O que NÃO deve ser commitado:
- Credenciais e senhas
- Arquivos de build
- Cache e temporários
- Dados de desenvolvimento local
- Logs de aplicação

## 🔧 Comandos Úteis

```bash
# Verificar arquivos ignorados
git status --ignored

# Forçar adicionar arquivo ignorado (cuidado!)
git add -f arquivo.txt

# Limpar cache do git (após atualizar .gitignore)
git rm -r --cached .
git add .
git commit -m "Update .gitignore"
```

## 📋 Checklist de Segurança

Antes de fazer commit, verifique:

- [ ] Nenhum arquivo `.env` está sendo commitado
- [ ] Nenhuma credencial ou chave privada
- [ ] Nenhum arquivo de banco de dados local
- [ ] Nenhum log com informações sensíveis
- [ ] Nenhum arquivo de build desnecessário

---

**Lembre-se:** O `.gitignore` é sua primeira linha de defesa contra vazamentos de dados sensíveis!