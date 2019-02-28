var express = require('express');
var router = express.Router();

var Sale = require('../models/sales');

/* GET sales listing. */
router.get('/', function(req, res, next) {

    Sale.aggregate([{
            $lookup: {
                from: 'products',
                localField: 'product',
                foreignField: '_id',
                as: 'products_docs'
            }
        }])
        .exec(
            (error, sale) => {
                if (error) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error al consultar ventas',
                        errors: error
                    });
                }

                res.status(200).json(sale);
            });

    // Sale.find({})
    //     .populate('product')
    //     .exec(
    //         (error, sale) => {
    //             if (error) {
    //                 return res.status(500).json({
    //                     ok: false,
    //                     message: 'Error al consultar ventas',
    //                     errors: error
    //                 });
    //             }

    //             res.status(200).json({
    //                 ok: true,
    //                 sale: sale
    //             });
    //         });

});

// Post inventory
router.post('/', (req, res) => {
    var body = req.body;

    var sale = new Sale({
        name: body.name,
        quantity: body.quantity,
        price: body.price,
        total: body.total,
        product: body.product,
        inventary: body.inventary
    });

    sale.save((error, saveSale) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                message: 'Error al agregar inventario',
                errors: error
            });
        }

        return res.status(201).json({
            ok: true,
            sale: saveSale
        });

    });
});

// Update
router.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Sale.findById(id, (error, sale) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar venta',
                errors: error
            });
        }
        if (!sale) {
            return res.status(400).json({
                ok: false,
                message: 'Error la ventas no existe',
                errors: { message: 'la ventas no existe ' }
            });
        }

        sale.name = body.name;
        sale.quantity = body.quantity;
        sale.price = body.price;
        sale.total = body.total;
        sale.product = body.product.id;
        sale.inventary = body.inventary.id;

        sale.save((error, saveSale) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error al actualizar venta',
                    errors: error
                });
            }

            return res.status(200).json({
                ok: true,
                sale: saveInventory
            });
        });

    });
});

// Delete User
router.delete('/:id', (req, res) => {
    var id = req.params.id;

    Sale.findByIdAndRemove(id, (error, deleteSale) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error al borrar venta',
                errors: error
            });
        }

        if (!deleteSale) {
            return res.status(400).json({
                ok: false,
                message: 'La venta no existe con ese id',
                errors: { message: 'La venta no existe con ese id' }
            });
        }

        return res.status(200).json({
            ok: true,
            sale: deleteSale
        });
    });
});

module.exports = router;