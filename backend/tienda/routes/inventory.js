var express = require('express');
var router = express.Router();

var Inventory = require('../models/inventory');
var ObjectID = require('mongodb').ObjectID;


/* GET inventories listing. */
router.get('/', function(req, res, next) {

    Inventory.find({})
        .populate('inventory')
        .exec(
            (error, inventory) => {
                if (error) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error al consultar inventario',
                        errors: error
                    });
                }

                return res.status(200).json(inventory);
            });

});

// Post inventory
router.post('/', (req, res) => {
    var body = req.body;

    var inventory = new Inventory({
        quantity: body.quantity,
        inventory: body.inventory
    });

    inventory.save((error, saveInventory) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                message: 'Error al agregar inventario',
                errors: error
            });
        }

        return res.status(201).json({
            ok: true,
            prodcut: saveInventory
        });

    });
});

// Update
router.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Inventory.findById(id, (error, inventory) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar inventario',
                errors: error
            });
        }
        if (!inventory) {
            return res.status(400).json({
                ok: false,
                message: 'Error el inventario no existe',
                errors: { message: 'El inventario no existe ' }
            });
        }

        inventory.quantity = body.quantity;
        inventory.inventory = body.inventory;

        inventory.save((error, saveInventory) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error al actualizar inventario',
                    errors: error
                });
            }

            return res.status(200).json({
                ok: true,
                inventory: saveInventory
            });
        });

    });
});

// Delete User
router.delete('/:id', (req, res) => {
    var id = req.params.id;

    Inventory.findByIdAndRemove(id, (error, deleteInventory) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error al borrar inventario',
                errors: error
            });
        }

        if (!deleteInventory) {
            return res.status(400).json({
                ok: false,
                message: 'El inventario no existe con ese id',
                errors: { message: 'El inventario no existe con ese id' }
            });
        }

        return res.status(200).json({
            ok: true,
            prodcut: deleteInventory
        });
    });
});

module.exports = router;