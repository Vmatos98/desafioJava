# Dockerfile para Frontend React + TypeScript

# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci --silent

COPY public ./public
COPY src ./src

RUN npm run build

# Production stage
FROM nginx:1.25-alpine

RUN apk add --no-cache curl

# Use configuração mínima do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]