# CHECKLIST PRÉ-DEPLOYMENT

**Integrantes:** Michel Barbosa Meira (255441) | Vinnicus de Lacerda (257062)

---

## ✅ CÓDIGO PREPARADO

- [x] Frontend com nomes e RAs no título
- [x] Backend com CORS configurável
- [x] Backend com suporte a variáveis de ambiente
- [x] URL da API detecta automaticamente produção vs. desenvolvimento
- [x] package.json com scripts de start
- [x] .env.example criado como referência

---

## 📋 ANTES DO DEPLOYMENT

### GitHub
- [ ] Criar repositório no GitHub (https://github.com/new)
- [ ] Clone localmente ou configure remote:
  ```bash
  git remote add origin https://github.com/SEU_USUARIO/todoapp.git
  ```
- [ ] Fazer commit e push:
  ```bash
  git add .
  git commit -m "Preparação para deployment em Render"
  git push -u origin main
  ```

### MongoDB
- [ ] Criar conta em https://www.mongodb.com/cloud/atlas
- [ ] Criar cluster gratuito
- [ ] Copiar connection string no formato:
  ```
  mongodb+srv://usuario:senha@cluster.mongodb.net/tododb
  ```

### Render.com
- [ ] Criar conta em https://render.com
- [ ] Conectar GitHub

---

## 🚀 PASSO A PASSO DEPLOYMENT

### 1. DEPLOY BACKEND

No Render Dashboard:
1. New → Web Service
2. Selecionar repositório GitHub
3. Configurar:
   - Name: `todoapp-backend`
   - Environment: Node
   - Build: `npm install`
   - Start: `npm start`
   - Branch: main

4. Environment Variables (CRÍTICO):
   ```
   PORT=10000
   MONGODB_URL=mongodb+srv://usuario:senha@cluster.mongodb.net/tododb
   NODE_ENV=production
   CORS_ORIGIN=https://todoapp-frontend.onrender.com
   ```

5. Deploy (aguarde 3-5 min)

**Resultado esperado:** ✅ Backend rodando em `https://todoapp-backend.onrender.com`

---

### 2. DEPLOY FRONTEND

No Render Dashboard:
1. New → Static Site
2. Selecionar repositório GitHub
3. Configurar:
   - Name: `todoapp-frontend`
   - Build Command: `cd FRONTEND/TODOapp && npm install && ng build --configuration production`
   - Publish Directory: `FRONTEND/TODOapp/dist/todoapp/browser`
   - Branch: main

4. Deploy (aguarde 3-5 min)

**Resultado esperado:** ✅ Frontend rodando em `https://todoapp-frontend.onrender.com`

---

## 🧪 TESTES

### No Desktop
- [ ] Abrir https://todoapp-frontend.onrender.com
- [ ] Verificar se nomes aparecem: "Michel Barbosa Meira (255441) | Vinnicus de Lacerda (257062)"
- [ ] Adicionar uma tarefa - deve aparecer na lista
- [ ] Editar uma tarefa - deve atualizar
- [ ] Deletar uma tarefa - deve remover
- [ ] Abrir DevTools (F12) → Console - não deve haver erros CORS

### No Celular
- [ ] Conectar à mesma rede (ou internet)
- [ ] Abrir em browser: https://todoapp-frontend.onrender.com
- [ ] Repetir testes acima
- [ ] Testar layout responsivo

---

## ❌ SE NÃO FUNCIONAR

### Problema: CORS Error no Console
**Solução:**
1. Ir em Render → Backend → Environment
2. Verificar `CORS_ORIGIN` está correto
3. Clicar em "Auto-Deploy" para redeploy

### Problema: Backend retorna 404
**Solução:**
1. Verificar se Backend foi deployed com sucesso
2. Ir em Render → Backend → Logs
3. Procurar mensagem "Server Started at 10000"

### Problema: MongoDB Connection Error
**Solução:**
1. Verificar connection string em Render → Backend → Environment
2. Ir ao MongoDB Atlas → Security → Network Access
3. Adicionar IP "0.0.0.0/0" para permitir qualquer IP

### Problema: Frontend em branco
**Solução:**
1. Ir em Render → Frontend → Logs
2. Procurar erros no build
3. Verificar se `dist/todoapp/browser` está correto
4. Fazer push de novo código

---

## 📱 DIA DA AULA

- [ ] Testar 30 min antes da aula
- [ ] Ter a senha anotada
- [ ] Preparar PDF com informações:
  - Nome: Michel Barbosa Meira (255441)
  - Nome: Vinnicus de Lacerda (257062)
  - Senha: [preenchido na aula]
  - Frontend: Render.com
  - Backend: Render.com
  - URL: https://todoapp-frontend.onrender.com

- [ ] Fazer upload do PDF no Teams

---

## 📍 MANUTENÇÃO (15 DIAS)

- [ ] Verificar app toda segunda vez
- [ ] Se houver erro, corrigir imediatamente
- [ ] Responder Teams se houver avisos do professor
- [ ] Manter MongoDB rodarando
- [ ] Manter Render.com rodando (não deletar)

---

## CONTATOS

Se tiver dúvidas:
1. Render Support: https://render.com/docs
2. MongoDB Support: https://docs.mongodb.com
3. Angular Build: https://angular.io/guide/build

Good luck! 🚀
