
const router = require('express').Router();


const controller = require('../controllers/index.controller')

router.get('/',controller.productsHome)

router.post('/add-product',controller.addProduct)



module.exports = router;
