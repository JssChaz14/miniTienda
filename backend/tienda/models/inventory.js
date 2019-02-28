var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventoryShcema = new Schema({
    quantity: { type: String, required: [true, 'cantidad requerida'] },
    inventory: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'id Producto requerido']
    }
});

module.exports = mongoose.model('Inventory', inventoryShcema);