var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {

    User.find({}, 'name email img role').exec(

        (error, users) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al consultar usuarios',
                    errors: error
                });
            }

            return res.status(200).json({
                ok: true,
                message: 'Lista de usuarios',
                users
            });
        });

});

// Post Users
router.post('/', (req, res) => {
    var body = req.body;

    var user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.rol
    });

    user.save((error, saveUser) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                message: 'Error al agregar usuario',
                errors: error
            });
        }

        return res.status(201).json({
            ok: true,
            user: saveUser
        });

    });
});

// Update
router.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    User.findById(id, (error, user) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar usuario',
                errors: error
            });
        }
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'Error el usuario no existe',
                errors: { message: 'El usuario no existe ' }
            });
        }

        user.name = body.name;
        user.email = body.email;
        // user.role = body.role;

        user.save((error, saveUser) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error al actualizar usuario',
                    errors: error
                });
            }

            saveUser.password = '******';

            return res.status(200).json({
                ok: true,
                user: saveUser
            });
        });

    });
});

// Delete User
router.delete('/:id', (req, res) => {
    var id = req.params.id;

    User.findByIdAndRemove(id, (error, deleteUser) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error al borrar usuario',
                errors: error
            });
        }

        if (!deleteUser) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario no existe con ese id',
                errors: { message: 'El usuario no existe con ese id' }
            });
        }

        return res.status(200).json({
            ok: true,
            user: deleteUser
        });
    });
});

module.exports = router;