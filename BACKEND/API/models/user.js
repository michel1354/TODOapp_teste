var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
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
module.exports = mongoose.model('User', userSchema)