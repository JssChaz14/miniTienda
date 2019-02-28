var express = require('express');
var router = express.Router();

var fileUpload = require('express-fileupload');

router.use(fileUpload());



/* GET users listing. */
router.put('/', function(req, res, next) {
    return res.status(200).json({
        ok: true,
        message: 'subir archivos'
    });
});

module.exports = router;