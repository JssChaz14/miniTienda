var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var roles = {
    values: ['admin', 'user'],
    message: '{VALUE} rol no valido'
}

var userSchema = new Schema({
    name: { type: String, required: [true, 'nombre requerido'] },
    email: { type: String, required: [true, 'coreo requerido'] },
    password: { type: String, required: [true, 'contraseña requerido'] },
    role: { type: String, required: true, default: 'admin', enum: roles },
    img: { type: String, required: false }
});

userSchema.plugin(uniqueValidator, { message: 'email unico' });

module.exports = mongoose.model('User', userSchema);