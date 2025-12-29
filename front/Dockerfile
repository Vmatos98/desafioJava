# Dockerfile para Frontend React + TypeScript

# Estágio de build
FROM node:18-alpine as build

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependências
RUN npm ci --only=production --silent

# Copiar código fonte
COPY public ./public
COPY src ./src

# Build da aplicação
RUN npm run build

# Estágio de produção com Nginx
FROM nginx:1.25-alpine

# Instalar curl para health checks
RUN apk add --no-cache curl

# Remover configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar arquivos buildados
COPY --from=build /app/build /usr/share/nginx/html

# Criar usuário não-root
# RUN addgroup -g 1001 -S nginx && \
#     adduser -u 1001 -S nginx -G nginx

# Ajustar permissões
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid && \
    chown -R nginx:nginx /usr/share/nginx/html

# Mudar para usuário não-root
USER nginx:nginx

# Expor porta
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:8080 || exit 1

# Comando para executar
CMD ["nginx", "-g", "daemon off;"]