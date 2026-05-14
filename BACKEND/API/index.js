const express = require('express');
const cors = require('cors');
const app = express();

// Configurar CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'id-token']
}));

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