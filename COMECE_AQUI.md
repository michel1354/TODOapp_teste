# 🎉 TODO APP - DEPLOYMENT PRONTO!

## ✅ STATUS: PRONTO PARA DEPLOY

Data: 22/04/2026

---

## 👥 EQUIPE
- Michel Barbosa Meira (RA: 255441)
- Vinnicus de Lacerda (RA: 257062)

---

## 📋 O QUE FOI REALIZADO

### 1️⃣ Modificações no Código

**Frontend (`FRONTEND/TODOapp/src/app/app.ts`):**
```typescript
// ANTES:
this.apiURL = 'http://localhost:3000';

// DEPOIS:
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
this.apiURL = isDevelopment ? 'http://localhost:3000' : 'https://todoapp-backend.onrender.com';
```

**Frontend (`FRONTEND/TODOapp/src/app/app.html`):**
```html
<!-- ANTES -->
<h1>Mozilla Dev - My To Do List</h1>

<!-- DEPOIS -->
<h1>Michel Barbosa Meira (255441) | Vinnicus de Lacerda (257062) - My To Do List</h1>
```

**Backend (`BACKEND/API/index.js`):**
- ✅ Adicionado suporte a CORS dinâmico
- ✅ Adicionado suporte a variáveis de ambiente (.env)
- ✅ Melhorado tratamento de CORS

**Backend (`BACKEND/API/package.json`):**
- ✅ Adicionado `"cors"` nas dependências
- ✅ Adicionado `"dotenv"` nas dependências
- ✅ Adicionado script `"start": "node index.js"`
- ✅ Adicionado script `"dev": "nodemon index.js"`

### 2️⃣ Arquivos Criados

```
d:\WEBWORKSPACE2\
├── DEPLOYMENT_GUIDE.md          ← Guia completo e detalhado
├── QUICK_DEPLOY_GUIDE.md        ← Guia rápido (resumido)
├── CHECKLIST.md                 ← Checklist passo a passo
├── TEMPLATE_PDF_TEAMS.md        ← Template do documento PDF
├── README_DEPLOYMENT.md         ← Resumo executivo (este arquivo)
├── BACKEND/API/.env.example     ← Exemplo de variáveis de ambiente
└── .gitignore                   ← Configuração do Git
```

### 3️⃣ Git Commits

```
f5b72e6 - Adicionar .gitignore para excluir node_modules
c08a912 - Preparação para deploy - Nomes e RAs, Backend e Frontend prontos
```

---

## 🎯 PRÓXIMAS AÇÕES (URGENTE!)

### ANTES DA AULA:

#### 1. **Criar GitHub e fazer Push (⏰ CRÍTICO)**
```bash
# No terminal PowerShell:
cd D:/WEBWORKSPACE2

# Se ainda não tem repositório remoto:
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git branch -M main
git push -u origin main

# Se já tem:
git push origin main
```

#### 2. **MongoDB Atlas (⏰ IMPORTANTE)**
1. Acesse: https://www.mongodb.com/cloud/atlas
2. Crie conta
3. Crie cluster gratuito
4. Copie connection string:
   ```
   mongodb+srv://usuario:senha@cluster.mongodb.net/tododb
   ```
   ☝️ **Guardar esta string - será usada em breve!**

#### 3. **Render.com - Deploy Backend**
1. Acesse: https://render.com
2. Dashboard → **New → Web Service**
3. Conecte repositório GitHub
4. Configure:
   - Name: `todoapp-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Branch: `main`

5. **Environment Variables** (CRÍTICO!):
   ```
   PORT=10000
   MONGODB_URL=<sua_connection_string_aqui>
   NODE_ENV=production
   CORS_ORIGIN=https://todoapp-frontend.onrender.com
   ```
6. Clique **Deploy**
7. Aguarde 3-5 minutos
8. **Copiar URL do backend:** `https://todoapp-backend.onrender.com`

#### 4. **Render.com - Deploy Frontend**
1. Dashboard → **New → Static Site**
2. Conecte repositório GitHub
3. Configure:
   - Name: `todoapp-frontend`
   - Build Command: `cd FRONTEND/TODOapp && npm install && ng build --configuration production`
   - Publish Directory: `FRONTEND/TODOapp/dist/todoapp/browser`
   - Branch: `main`
4. Deploy
5. Aguarde 3-5 minutos
6. **Copiar URL do frontend:** `https://todoapp-frontend.onrender.com`

---

## 🧪 TESTES OBRIGATÓRIOS

- [ ] Abrir no browser: `https://todoapp-frontend.onrender.com`
- [ ] Verificar títulos: "Michel Barbosa Meira (255441) | Vinnicus de Lacerda (257062)"
- [ ] Adicionar tarefa
- [ ] Editar tarefa
- [ ] Deletar tarefa
- [ ] Abrir no celular (mobile test)
- [ ] Verificar console (F12) - sem erros CORS

---

## 📄 DOCUMENTO FINAL (PDF)

**Preparar PDF para Teams com:**
- Integrante 1: Michel Barbosa Meira - RA: 255441
- Integrante 2: Vinnicus de Lacerda - RA: 257062
- Senha: [Será fornecida na aula]
- Frontend: Render.com
- Backend: Render.com
- URL Frontend: https://todoapp-frontend.onrender.com

Use [TEMPLATE_PDF_TEAMS.md](TEMPLATE_PDF_TEAMS.md) como referência.

---

## ❌ SE ALGO DER ERRADO

| Problema | Solução |
|----------|---------|
| CORS Error | Verificar `CORS_ORIGIN` em Render → Backend → Environment |
| Backend 404 | Verificar logs em Render → Backend → Logs |
| MongoDB erro | Verificar connection string em Render → Backend → Environment |
| Frontend em branco | Verificar logs em Render → Frontend → Logs |
| Build fail | Fazer push do código → Render redeploy automático |

---

## 📞 LINKS RÁPIDOS

- **Render.com:** https://render.com
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **GitHub:** https://github.com
- **Angular Docs:** https://angular.io/guide/build

---

## ⚙️ MANUTENÇÃO (15 DIAS)

Após receber a senha na aula:
- ✅ Manter app rodando 24h por dia
- ✅ Verificar funcionamento diariamente
- ✅ Responder prontamente a Teams se houver avisos
- ✅ Não deletar repositórios no Render
- ✅ Manter MongoDB conectado

---

## 📊 RESUMO TÉCNICO

| Componente | Tecnologia | Provider |
|-----------|-----------|----------|
| Frontend | Angular 21 | Render.com |
| Backend | Node.js/Express | Render.com |
| Database | MongoDB | MongoDB Atlas |
| Versionamento | Git | GitHub |

---

## ✨ CHECKLIST FINAL

- [ ] GitHub setup
- [ ] MongoDB Atlas setup
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] Testes mobile OK
- [ ] PDF preparado
- [ ] PDF enviado em Teams
- [ ] App funcionando 24h

---

**Boa sorte! 🚀 O app está pronto para ir para a produção!**

> Última atualização: 22/04/2026 às 14:30
