# 🏆 Sistema de Cadastro de Aprovados em Concursos

Sistema completo para cadastro de pessoas aprovadas em concursos públicos, desenvolvido com **Java Spring Boot** no backend e **React + TypeScript** no frontend.

## 📋 Funcionalidades

- ✅ Formulário responsivo e profissional
- 📷 Upload de imagem com preview
- 📱 Validação de campos em tempo real
- 👥 **Visualização de aprovados cadastrados**
- 🔍 **Modal com detalhes completos**
- 🎨 Design moderno e acessível
- 💾 Armazenamento em banco H2
- 🔄 API REST completa
- 🔒 **TypeScript para maior segurança**

## 🚀 Como Executar

### 🐳 **Opção 1: Docker (Recomendado para Produção)**

#### Pré-requisitos:
- Docker 20.10+
- Docker Compose 2.0+

#### Deploy Rápido:
```bash
# Clone o repositório
git clone <seu-repositorio>
cd desafio-java

# Execute o script de deploy
./deploy.sh
```

#### Deploy Manual:
```bash
# Desenvolvimento
docker-compose up --build

# Produção
docker-compose -f docker-compose.prod.yml up --build -d

# Portainer (recomendado para servidores)
docker-compose -f docker-compose.portainer.yml up --build -d
```

#### 🚀 **Deploy com Portainer:**
1. Acesse seu Portainer
2. Crie uma nova Stack
3. Use o repositório Git com `docker-compose.portainer.yml`
4. Deploy! 

**💡 Conflito de portas?** Use `docker-compose.flexible.yml` com variáveis de ambiente

**🔧 Problemas de API?** Veja o [Guia de Troubleshooting](TROUBLESHOOTING-API.md)

📖 **Guia completo:** [DEPLOY-PORTAINER.md](DEPLOY-PORTAINER.md)

#### Acessar:
- **Frontend:** http://localhost:3001 (ou sua porta configurada)
- **Backend:** http://localhost:8091 (ou sua porta configurada)

### 💻 **Opção 2: Desenvolvimento Local**

### Backend (Java Spring Boot)

1. **Pré-requisitos:**
   - Java 17 ou superior
   - Maven 3.6+

2. **Executar:**
   ```bash
   cd back
   mvn spring-boot:run
   ```

3. **Acessar:**
   - API: http://localhost:8080
   - Console H2: http://localhost:8080/h2-console
     - JDBC URL: `jdbc:h2:mem:testdb`
     - Username: `sa`
     - Password: (deixar vazio)

### Frontend (React + TypeScript)

1. **Pré-requisitos:**
   - Node.js 16+ 
   - npm ou yarn

2. **Instalar dependências:**
   ```bash
   cd front
   npm install
   ```

3. **Executar:**
   ```bash
   npm start
   ```

4. **Acessar:**
   - Aplicação: http://localhost:3000

## 🎯 Funcionalidades da Interface

### 📝 Aba Cadastrar
- Formulário completo com validações
- Upload de imagem opcional
- Feedback em tempo real
- Máscaras automáticas

### 👥 Aba Ver Cadastrados
- **Lista todos os aprovados cadastrados**
- **Cards informativos com preview**
- **Modal com detalhes completos**
- **Botão de atualização**
- **Contador de registros**
- **⚠️ Aviso didático sobre segurança**

## 📊 Estrutura do Projeto

```
├── back/                          # Backend Java Spring Boot
│   ├── src/main/java/com/concursos/
│   │   ├── AprovadosApplication.java
│   │   ├── config/
│   │   │   └── CorsConfig.java
│   │   ├── controller/
│   │   │   └── AprovadoController.java
│   │   ├── model/
│   │   │   └── Aprovado.java
│   │   ├── repository/
│   │   │   └── AprovadoRepository.java
│   │   └── service/
│   │       └── AprovadoService.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── front/                         # Frontend React + TypeScript
    ├── public/
    │   ├── index.html
    │   └── manifest.json
    ├── src/
    │   ├── components/
    │   │   ├── FormularioAprovado.tsx
    │   │   ├── FormularioAprovado.css
    │   │   ├── ListaAprovados.tsx
    │   │   └── ListaAprovados.css
    │   ├── types/
    │   │   └── index.ts
    │   ├── App.tsx
    │   ├── App.css
    │   ├── index.tsx
    │   └── index.css
    ├── package.json
    └── tsconfig.json
```

## 🎯 Campos do Formulário

- **Nome Completo** (obrigatório)
- **Email** (obrigatório, com validação)
- **Telefone** (obrigatório, com máscara)
- **Concursos Aprovados** (obrigatório, textarea)
- **Foto** (opcional, JPG/PNG, máx. 5MB)

## 🔧 Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Validation
- H2 Database
- Maven

### Frontend
- **React 18 + TypeScript**
- Axios (requisições HTTP)
- React Input Mask (máscara de telefone)
- CSS3 com Flexbox/Grid
- Font Inter (Google Fonts)

## 📱 Design Responsivo

O sistema foi desenvolvido com design mobile-first, garantindo uma experiência excelente em:
- 📱 Smartphones
- 📱 Tablets
- 💻 Desktops

## 🎨 Características do Design

- **Navegação por abas** intuitiva
- **Gradiente moderno** no background
- **Glassmorphism** nos componentes
- **Animações suaves** nos elementos
- **Cards informativos** para listagem
- **Modal responsivo** para detalhes
- **Feedback visual** em tempo real
- **Cores acessíveis** e contrastantes
- **Tipografia profissional** (Inter)

## 🔒 Validações

### Frontend (TypeScript)
- Tipagem estática para maior segurança
- Campos obrigatórios
- Formato de email
- Máscara de telefone
- Tipo e tamanho de imagem

### Backend
- Validação com Bean Validation
- Tratamento de erros
- Sanitização de dados

## 📝 API Endpoints

- `POST /api/aprovados` - Cadastrar aprovado
- `GET /api/aprovados` - Listar todos
- `GET /api/aprovados/{id}` - Buscar por ID

## 🎯 Para o Avaliador

A aplicação agora possui:

1. **Interface completa** com duas abas funcionais
2. **Visualização de dados** cadastrados em tempo real
3. **TypeScript** para maior robustez e manutenibilidade
4. **Design profissional** e responsivo
5. **Experiência do usuário** otimizada
6. **⚠️ Aviso de segurança** na tela de visualização

**Navegue entre as abas "Cadastrar" e "Ver Cadastrados" para testar todas as funcionalidades!**

### 🔒 Nota sobre Segurança
A tela de visualização inclui um aviso explicando que em produção seria necessária autenticação e controle de permissões. Esta funcionalidade existe apenas para facilitar a avaliação técnica.

## 🐳 Docker

### Estrutura dos Containers:
- **Backend:** Java 17 + Spring Boot (porta 8080)
- **Frontend:** React + TypeScript + Nginx (porta 80)
- **Volumes:** Dados persistentes para H2 e uploads
- **Network:** Rede isolada para comunicação entre containers

### Comandos Docker Úteis:
```bash
# Ver logs
docker-compose logs -f

# Parar containers
docker-compose down

# Reiniciar
docker-compose restart

# Limpar tudo
docker-compose down -v --rmi all
```

### Configurações de Produção:
- **Health checks** para monitoramento
- **Logs rotativos** para evitar enchimento de disco
- **Variáveis de ambiente** configuráveis
- **Nginx otimizado** com cache e compressão
- **Segurança** com usuário não-root

Para produção, considere:
- Banco de dados PostgreSQL/MySQL
- Autenticação e autorização
- Testes unitários e integração
- Deploy com Docker
- CDN para imagens
- Monitoramento e logs

## 🚀 Próximos Passos

**Desenvolvido para o desafio técnico** 🎯