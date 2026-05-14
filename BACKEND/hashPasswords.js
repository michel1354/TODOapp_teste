const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Configurar conexão
const mongoURL = process.env.MONGODB_URL || 'mongodb://localhost:27017/tasksDB';
mongoose.connect(mongoURL);

const userSchema = new mongoose.Schema({
 nome: {
 unique: true,
 sparse: true,
 required: true,
 type: String,
 trim: true
 },
 senha: {
 type: String,
 required: true
 },
 isAdmin: {
 type: Boolean,
 default: false
 }
},
 {
 versionKey: false
 }
);

const User = mongoose.model('User', userSchema);

async function hashPasswords() {
  try {
    console.log('Iniciando hash de senhas...');
    
    // Buscar todos os usuários
    const usuarios = await User.find({});
    console.log(`Encontrados ${usuarios.length} usuários`);
    
    for (let usuario of usuarios) {
      // Verificar se a senha já é um hash (hashes bcrypt começam com $2)
      if (usuario.senha.startsWith('$2')) {
        console.log(`✓ ${usuario.nome} já possui hash`);
        continue;
      }
      
      // Fazer hash da senha
      const senhaHash = await bcrypt.hash(usuario.senha, 10);
      usuario.senha = senhaHash;
      await usuario.save();
      console.log(`✓ ${usuario.nome} - senha hashificada`);
    }
    
    console.log('✅ Todas as senhas foram hashificadas com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

hashPasswords();
