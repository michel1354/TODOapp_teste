# Guia de Deployment - TODO App

**Integrantes:** Michel Barbosa Meira (255441) | Vinnicus de Lacerda (257062)

---

## 1. PREPARAÇÃO INICIAL

### 1.1 Criar Conta no Render.com
- Acesse https://render.com
- Crie uma conta (recomenda-se usar GitHub)
- Faça login

### 1.2 Preparar o Repositório Git
```bash
cd D:/WEBWORKSPACE2
git add .
git commit -m "Preparação para deployment"
git branch -M main
```

Você precisa fazer upload para GitHub primeiro:
1. Crie um repositório no GitHub (private ou public)
2. Execute:
```bash
git remote add origin https://github.com/SEU_USUARIO/todoapp.git
git push -u origin main
```

---

## 2. DEPLOYMENT DO BACKEND (Node.js + Express)

### 2.1 Preparar o Backend para Production

#### A. Criar arquivo `.env` (não faça push para Git):
```
PORT=10000
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/tododb
NODE_ENV=production
CORS_ORIGIN=https://seu-frontend.onrender.com
```

#### B. Modificar `BACKEND/API/index.js` para suportar production:

Certifique-se que o arquivo tem:
```javascript
const cors = require('cors');
const express = require('express');
require('dotenv').config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Routes
const rotas = require('./routes/routes');
app.use('/api', rotas);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

#### C. Atualizar `BACKEND/API/package.json`:

Adicione `"dotenv"` nas dependências:
```json
{
  "name": "api",
  "version": "1.0.0",
  "description": "",
  "license": "ISC",
  "author": "",
  "type": "commonjs",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^5.2.1",
    "mongodb": "^7.1.1",
    "mongoose": "^9.4.1",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  }
}
```

### 2.2 Deploy Backend no Render.com

1. No dashboard do Render, clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório GitHub
3. Configure:
   - **Name:** `todoapp-backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Branch:** main
   - **Plan:** Free

4. Em **Environment**, adicione as variáveis:
   ```
   PORT=10000
   MONGODB_URI=sua_string_de_conexao
   NODE_ENV=production
   CORS_ORIGIN=https://seu-frontend-url.onrender.com
   ```

5. Clique em **"Deploy"**

**Seu Backend estará disponível em:** `https://todoapp-backend.onrender.com`

---

## 3. DEPLOYMENT DO FRONTEND (Angular)

### 3.1 Preparar o Frontend

#### A. Atualize a URL da API no Frontend

Edite `FRONTEND/TODOapp/src/app/app.ts` (ou onde a API é chamada):

```typescript
private apiUrl = 'https://todoapp-backend.onrender.com/api/tarefas';
```

#### B. Build do Angular

```bash
cd FRONTEND/TODOapp
npm install
ng build --configuration production
```

Isso gera os arquivos em `dist/todoapp/browser/`

### 3.2 Deploy Frontend no Render.com

1. No dashboard, clique em **"New +"** → **"Static Site"**
2. Conecte seu repositório GitHub
3. Configure:
   - **Name:** `todoapp-frontend`
   - **Build Command:** `cd FRONTEND/TODOapp && npm install && ng build --configuration production`
   - **Publish Directory:** `FRONTEND/TODOapp/dist/todoapp/browser`
   - **Branch:** main
   - **Plan:** Free

4. Clique em **"Create Static Site"**

**Seu Frontend estará disponível em:** `https://todoapp-frontend.onrender.com`

---

## 4. BANCO DE DADOS (MongoDB)

### Opções:

#### A. MongoDB Atlas (Recomendado - Gratuito)
1. Acesse https://www.mongodb.com/cloud/atlas
2. Crie uma conta
3. Crie um cluster gratuito
4. Obtenha a connection string
5. Use em `MONGODB_URI` no Backend

#### B. Usar serviço MongoDB no Render (Pago)

---

## 5. VERIFICAÇÃO FINAL

### Checklist antes da aula:

- [ ] Nome e RA aparecem no lugar de "Mozilla Dev - My To Do List"
- [ ] Frontend acessível em: `https://todoapp-frontend.onrender.com`
- [ ] Backend acessível em: `https://todoapp-backend.onrender.com/api/tarefas`
- [ ] Testou no celular se consegue acessar
- [ ] CRUD (Create, Read, Update, Delete) funcionando
- [ ] Variáveis de ambiente configuradas no Backend

### Testar no navegador:
```
Frontend: https://todoapp-frontend.onrender.com
Backend: https://todoapp-backend.onrender.com/api/tarefas
```

---

## 6. MANUTENÇÃO (15 DIAS)

Durante os 15 dias:
- Verificar logs no Render.com
- Manter o app funcionando
- Responder prontamente a avisos do professor no Teams

Se houver erro:
1. Verifique os logs no Render
2. Atualize o código no GitHub
3. O Render redeploy automaticamente

---

## 7. DOCUMENTO FINAL (PDF PARA TEAMS)

Crie um PDF com:
- **Integrantes:** Michel Barbosa Meira (255441) e Vinnicus de Lacerda (257062)
- **Senha de comprovação:** [Será fornecida na aula]
- **Frontend:** Render.com
- **Backend:** Render.com
- **URL Frontend:** https://todoapp-frontend.onrender.com
- **URL Backend:** https://todoapp-backend.onrender.com

---

## Dúvidas Frequentes

**P: Preciso de um cartão de crédito?**
R: Não para o plano free, mas Render pode pedir dados de pagamento para verificação.

**P: Quanto tempo leva para fazer deploy?**
R: 2-5 minutos normalmente.

**P: O app continua rodando 24h?**
R: Sim, o plano free do Render mantém a aplicação online 24h.

**P: E se der erro no deployment?**
R: Verifique os logs no Render → corrija o código → faça push → redeploy automático.
