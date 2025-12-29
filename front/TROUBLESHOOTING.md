# 🔧 Solução de Problemas

## Erro de TypeScript - FormData não encontrado

Se você encontrar o erro:
```
ERROR in ./src/components/FormularioAprovado.tsx
export 'FormData' (imported as 'FormData') was not found in '../types'
```

### Soluções:

1. **Limpar cache do React:**
   ```bash
   cd front
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

2. **Limpar cache do TypeScript:**
   ```bash
   cd front
   npx tsc --build --clean
   ```

3. **Reiniciar o servidor de desenvolvimento:**
   ```bash
   cd front
   npm start
   ```

4. **Se o problema persistir, force a reconstrução:**
   ```bash
   cd front
   rm -rf build
   npm run build
   npm start
   ```

## Estrutura de Tipos

Os tipos TypeScript estão agora em:
- `src/types/aprovado.types.ts`

Isso evita conflitos com o `FormData` nativo do JavaScript.