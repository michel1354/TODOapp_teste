const express = require('express');
const router = express.Router()
const modeloTarefa = require('../models/tarefa');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'segredo';

// Middleware de Autorização - verifica JWT token
function verificaJWT(req, res, next) {
  const token = req.headers['id-token'];
  if (!token) return res.status(401).json({
    auth: false, message: 'Token nao fornecido'
  });
  jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Falha na autenticação!' });
    req.user = decoded;
    next();
  });
}

// Middleware de Admin - verifica se é administrador
function verificaAdmin(req, res, next) {
  const token = req.headers['id-token'];
  if (!token) return res.status(401).json({
    auth: false, message: 'Token nao fornecido'
  });
  jwt.verify(token, JWT_SECRET, async function (err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Falha na autenticação!' });
    
    // Busca o usuário para verificar se é admin
    const usuario = await userModel.findOne({ 'nome': decoded.id });
    if (!usuario || !usuario.isAdmin) {
      return res.status(403).json({ auth: false, message: 'Acesso negado! Apenas administradores podem realizar esta ação.' });
    }
    req.user = decoded;
    next();
  });
}

// Endpoint de Login - Busca usuário no BD e compara senha
router.post('/login', async (req, res) => {
  try {
    // Validação de entrada
    if (!req.body.nome || !req.body.senha) {
      return res.status(400).json({ message: 'Nome e senha são obrigatórios!' });
    }

    const data = await userModel.findOne({ 'nome': req.body.nome });

    if (data == null) {
      return res.status(401).json({ message: 'Login inválido!' });
    }

    // Comparar senha diretamente (texto plano)
    if (data.senha === req.body.senha) {
      const token = jwt.sign({ id: req.body.nome, isAdmin: data.isAdmin }, JWT_SECRET, { expiresIn: 300 });
      return res.json({ auth: true, token: token, isAdmin: data.isAdmin });
    }

    res.status(401).json({ message: 'Login inválido!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar login' })
  }
});

// Endpoint de Registro - Cadastra novo usuário no BD (APENAS ADMIN)
router.post('/register', verificaAdmin, async (req, res) => {
  try {
    // Validação de entrada
    if (!req.body.nome || !req.body.senha) {
      return res.status(400).json({ message: 'Nome e senha são obrigatórios!' });
    }

    if (req.body.nome.trim().length < 3) {
      return res.status(400).json({ message: 'Nome deve ter pelo menos 3 caracteres!' });
    }

    // Verifica se o usuário já existe
    const usuarioExistente = await userModel.findOne({ 'nome': req.body.nome.trim() });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Usuário já existe!' });
    }

    // Cria novo usuário com senha em texto plano
    const novoUsuario = new userModel({
      nome: req.body.nome.trim(),
      senha: req.body.senha,
      isAdmin: req.body.isAdmin || false
    });

    await novoUsuario.save();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: { nome: novoUsuario.nome, isAdmin: novoUsuario.isAdmin } });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Este nome de usuário já está cadastrado!' });
    }
    res.status(500).json({ message: 'Erro ao cadastrar usuário' })
  }
});

// Endpoint para listar todos os usuários (APENAS ADMIN)
router.get('/usuarios', verificaAdmin, async (req, res) => {
  try {
    const usuarios = await userModel.find({}, { senha: 0 }); // Não retorna a senha
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar usuários' });
  }
});

// Endpoint para atualizar usuário (APENAS ADMIN)
router.patch('/usuarios/:id', verificaAdmin, async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID do usuário é obrigatório!' });
    }

    const { nome, isAdmin } = req.body;
    
    const { nome, senha, isAdmin } = req.body;
    
    // Valida se está tentando alterar nome
    if (nome) {
      if (nome.trim().length < 3) {
        return res.status(400).json({ message: 'Nome deve ter pelo menos 3 caracteres!' });
      }
      
      // Verifica se o novo nome já existe em outro usuário
      const usuarioComMesmoNome = await userModel.findOne({ 
        'nome': nome.trim(),
        '_id': { $ne: req.params.id }
      });
      if (usuarioComMesmoNome) {
        return res.status(400).json({ message: 'Este nome de usuário já está cadastrado!' });
      }
    }

    const updateData = {};
    if (nome) updateData.nome = nome.trim();
    if (senha) updateData.senha = senha;
    if (isAdmin !== undefined) updateData.isAdmin = isAdmin;

    const usuarioAtualizado = await userModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!usuarioAtualizado) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    res.json({ message: 'Usuário atualizado com sucesso!', usuario: usuarioAtualizado });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
});

// Endpoint para deletar usuário (APENAS ADMIN)
router.delete('/usuarios/:id', verificaAdmin, async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID do usuário é obrigatório!' });
    }

    const usuarioDeletado = await userModel.findByIdAndDelete(req.params.id);

    if (!usuarioDeletado) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    res.json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
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

module.exports = router;