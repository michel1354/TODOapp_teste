const express = require('express');
const router = express.Router()
module.exports = router;
const modeloTarefa = require('../models/tarefa');
const jwt = require('jsonwebtoken');

// Middleware de Autenticação - verifica username e senha
function verificaUsuarioSenha(req, res, next) {
  if (req.body.nome !== 'branqs' || req.body.senha !== '1234') {
    return res.status(401).json({ auth: false, message: 'Usuario ou Senha incorreta' });
  }
  next();
}

// Middleware de Autorização - verifica JWT token
function verificaJWT(req, res, next) {
  const token = req.headers['id-token'];
  if (!token) return res.status(401).json({
    auth: false, message: 'Token nao fornecido'
  });
  jwt.verify(token, 'segredo', function (err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Falha na autenticação!' });
    next();
  });
}

// Endpoint de Login - retorna JWT token
router.post('/login', (req, res, next) => {
  if (req.body.nome === 'branqs' && req.body.senha === '1234') {
    const token = jwt.sign({ id: req.body.nome }, 'segredo', { expiresIn: 300 });
    return res.json({ auth: true, token: token });
  }
  res.status(500).json({ message: 'Login invalido!' });
});

router.post('/post', verificaJWT, async (req, res) => {
    const objetoTarefa = new modeloTarefa({
        descricao: req.body.descricao,
        statusRealizada: req.body.statusRealizada
    })
    try {
        const tarefaSalva = await objetoTarefa.save();
        res.status(200).json(tarefaSalva)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/getAll', verificaJWT, async (req, res) => {
    try {
        const resultados = await modeloTarefa.find();
        const resposta = {
            aluno: "Michel Barbosa Meira",
            ra: "255441",
            tarefas: resultados
        };
        res.json(resposta)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/delete/:id', verificaJWT, async (req, res) => {
    try {
        const resultado = await modeloTarefa.findByIdAndDelete(req.params.id)
        res.json(resultado)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.patch('/update/:id', verificaJWT, async (req, res) => {
    try {
        const id = req.params.id;
        const novaTarefa = req.body;
        const options = { new: true };
        const result = await modeloTarefa.findByIdAndUpdate(
            id, novaTarefa, options
        )
        res.json(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})