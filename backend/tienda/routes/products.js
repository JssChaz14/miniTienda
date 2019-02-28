var express = require('express');
var router = express.Router();

var Product = require('../models/products');

/* GET users listing. */
router.get('/', function(req, res, next) {

    Product.find({}).exec(

        (error, products) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al consultar productos',
                    errors: error
                });
            }

            Product.count((error, count) => {
                return res.status(200).json({
                    ok: true,
                    message: 'Lista de Productos',
                    products: products,
                    total: count
                });
            });

        });

});

// Post products
router.post('/', (req, res) => {
    var body = req.body;

    var product = new Product({
        name: body.name,
        price: body.price,
        description: body.description,
        img: body.img,
        brand: body.brand
    });

    product.save((error, saveProducts) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                message: 'Error al agregar producto',
                errors: error
            });
        }

        return res.status(201).json({
            ok: true,
            product: saveProducts
        });

    });
});

// Update
router.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Product.findById(id, (error, product) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar producto',
                errors: error
            });
        }
        if (!product) {
            return res.status(400).json({
                ok: false,
                message: 'Error el producto no existe',
                errors: { message: 'El producto no existe ' }
            });
        }

        product.name = body.name;
        product.price = body.price;
        product.description = body.description;
        product.brand = body.brand;

        product.save((error, saveProducts) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error al actualizar producto',
                    errors: error
                });
            }

            return res.status(200).json({
                ok: true,
                product: saveProducts
            });
        });

    });
});

// Delete User
router.delete('/:id', (req, res) => {
    var id = req.params.id;

    Product.findByIdAndRemove(id, (error, deleteProdcuct) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error al borrar producto',
                errors: error
            });
        }

        if (!deleteProdcuct) {
            return res.status(400).json({
                ok: false,
                message: 'El producto no existe con ese id',
                errors: { message: 'El producto no existe con ese id' }
            });
        }

        return res.status(200).json({
            ok: true,
            product: deleteProdcuct
        });
    });
});

module.exports = router;