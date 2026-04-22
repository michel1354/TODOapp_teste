const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS Configuration - permite requisições de qualquer origem
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['HEAD', 'GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 3000;
const routes = require('./routes/routes');
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})

//Configurando a conexao com o Banco de Dados
var mongoose = require('mongoose');
const mongoURL = process.env.MONGODB_URL || 'mongodb://localhost:27017/todoapp';
mongoose.connect(mongoURL);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error)
})
db.once('connected', () => {
    console.log('Database Connected');
})