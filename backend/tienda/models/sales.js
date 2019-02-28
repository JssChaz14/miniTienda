var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var saleShcema = new Schema({
    name: { type: String, required: [true, 'nombre requerido'] },
    quantity: { type: String, required: [true, 'cantidad requerida'] },
    price: { type: String, required: [true, 'precio requerido'] },
    total: { type: String, required: [true, 'total requerido'] },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'id Producto requerido']
    },
    inventary: {
        type: Schema.Types.ObjectId,
        ref: 'Inventario',
        required: [true, 'id Inventario requerido']
    }
});

module.exports = mongoose.model('Sale', saleShcema);