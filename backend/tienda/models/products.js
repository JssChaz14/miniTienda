var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productsShcema = new Schema({
    name: { type: String, required: [true, 'Campo requerido'] },
    price: { type: String, required: [true, 'Campo requerido'] },
    description: { type: String, required: false },
    brand: { type: String, required: [true, 'Campo requerido'] },
    img: { type: String, required: false }
});

module.exports = mongoose.model('Product', productsShcema);