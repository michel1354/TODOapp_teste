# 🗄️ CONFIGURAÇÃO MONGODB - GUIA RÁPIDO

Sua string de conexão foi configurada!

---

## ✅ O QUE FOI FEITO

Arquivo `.env` criado em `BACKEND/API/.env` com:

```
PORT=3000
MONGODB_URL=mongodb+srv://michel255441:12345@cluster0.jazavyn.mongodb.net/?appName=Cluster0
NODE_ENV=development
CORS_ORIGIN=*
```

---

## 🧪 TESTAR LOCALMENTE

### 1. Instalar dependências (se não fez ainda)
```bash
cd BACKEND/API
npm install
```

### 2. Iniciar o servidor
```bash
npm start
```

Você deve ver no terminal:
```
Server Started at 3000
Database Connected
```

**Se vir `Database Connected` = ✅ MongoDB está funcionando!**

---

## 🚀 USAR NO RENDER.COM

### Ao fazer deploy do Backend no Render:

1. Ir em **Dashboard → Web Service → todoapp-backend**
2. Clicar em **Environment**
3. Adicionar as variáveis:

```
PORT=10000
MONGODB_URL=mongodb+srv://michel255441:12345@cluster0.jazavyn.mongodb.net/?appName=Cluster0
NODE_ENV=production
CORS_ORIGIN=https://seu-frontend-url.onrender.com
```

4. Clicar em **Save**
5. Render fará redeploy automaticamente

---

## ⚠️ OBSERVAÇÕES IMPORTANTES

### 1. **Segurança**
⚠️ Sua senha está visível na string!
- Em produção, use um usuário MongoDB específico para a API
- Considere criar um novo usuário no MongoDB Atlas com permissões limitadas

### 2. **IP Whitelist MongoDB**
No MongoDB Atlas:
1. Ir em **Security → Network Access**
2. Verificar se seu IP (ou 0.0.0.0/0) está permitido
3. ✅ Marque "Allow access from anywhere" para Render funcionar

### 3. **Não fazer push deste arquivo**
O `.env` **NÃO** deve ir para GitHub!
- Ele está em `.gitignore` (já configurado)
- Use variáveis de ambiente no Render em vez disso

---

## 📊 TESTANDO A CONEXÃO

### Via Terminal
```bash
cd BACKEND/API
npm start
```

### Via Browser
Acesse: `http://localhost:3000/api/getAll`

Você deve receber um JSON vazio (ou com tarefas se tiver adicionado antes):
```json
[]
```

---

## 🆘 TROUBLESHOOTING

| Erro | Solução |
|------|---------|
| `connection refused` | Verificar se MongoDB Atlas está online |
| `authentication failed` | Verificar senha (michel255441:12345) |
| `network timeout` | Adicionar seu IP em MongoDB → Network Access |
| `appName=Cluster0 error` | Use a string exatamente como está |

---

## ✅ CHECKLIST

- [ ] `.env` criado em `BACKEND/API/`
- [ ] `npm install` executado
- [ ] `npm start` funcionando localmente
- [ ] Mensagem "Database Connected" aparece
- [ ] Browser mostra JSON vazio em `/api/getAll`
- [ ] Variáveis configuradas no Render
- [ ] Backend deployado no Render

---

**Próximo passo: Fazer push ao GitHub e fazer deploy no Render.com!** 🚀
