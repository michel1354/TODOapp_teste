const mongoose = require('mongoose');
const schemaTarefa = new mongoose.Schema({
 descricao: {
 required: true,
 type: String
 },
 statusRealizada: {
 required: true,
 type: Boolean
 },
 usuarioId: {
 type: mongoose.Schema.Types.ObjectId,
 ref: 'User',
 required: false
 },
},
 {
 versionKey: false
 }
)
module.exports = mongoose.model('Tarefa', schemaTarefa)