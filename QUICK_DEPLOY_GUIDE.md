# GUIA RÁPIDO DE DEPLOYMENT

## 1. PREPARAR O CÓDIGO

### Backend (BACKEND/API)
- ✅ package.json atualizado com cors e dotenv
- ✅ index.js com suporte a variáveis de ambiente
- ✅ .env.example criado

### Frontend (FRONTEND/TODOapp)
- ✅ app.ts atualizado para detectar produção automaticamente
- ✅ Nomes e RAs adicionados no título

---

## 2. FAZER PUSH PARA GITHUB

```bash
git add .
git commit -m "Preparado para deployment em Render.com"
git push origin main
```

---

## 3. CONFIGURAR MONGODB ATLAS

1. Acesse: https://www.mongodb.com/cloud/atlas
2. Crie uma conta e cluster gratuito
3. Crie um usuário e pegue a connection string
4. Copie a string no formato:
   `mongodb+srv://usuario:senha@cluster.mongodb.net/tododb`

---

## 4. DEPLOYING NO RENDER.COM

### BACKEND

1. Acesse: https://render.com
2. Dashboard → New → Web Service
3. Conecte GitHub
4. Configurações:
   - **Name:** todoapp-backend
   - **Environment:** Node
   - **Build Command:** npm install
   - **Start Command:** npm start
   - **Branch:** main
   
5. Environment Variables:
   ```
   PORT=10000
   MONGODB_URL=<sua connection string do MongoDB>
   NODE_ENV=production
   CORS_ORIGIN=https://seu-frontend-url.onrender.com
   ```

6. Deploy

**URL Backend será:** https://todoapp-backend.onrender.com

---

### FRONTEND

1. Dashboard → New → Static Site
2. Conecte GitHub
3. Configurações:
   - **Name:** todoapp-frontend
   - **Build Command:** cd FRONTEND/TODOapp && npm install && ng build --configuration production
   - **Publish Directory:** FRONTEND/TODOapp/dist/todoapp/browser
   - **Branch:** main

4. Deploy

**URL Frontend será:** https://todoapp-frontend.onrender.com

---

## 5. TESTAR

- [ ] Abra https://todoapp-frontend.onrender.com no navegador
- [ ] Teste no celular
- [ ] Verifique se os nomes aparecem
- [ ] Teste adicionar, editar, deletar tarefas
- [ ] Se não funcionar, verifique:
  - Logs do Render
  - CORS_ORIGIN configurado corretamente
  - MongoDB URL correta
  - Build completou sem erros

---

## 6. MANUTENÇÃO

Se precisar fazer alterações:
1. Edite o código localmente
2. `git add .` → `git commit -m "..."` → `git push`
3. Render redeploy automaticamente

---

## IMPORTANTE

- Nunca faça push do arquivo `.env` real para GitHub
- Sempre use variáveis de ambiente no Render
- Teste localmente antes de fazer push
- Mantenha o app rodando 24h pelos próximos 15 dias
