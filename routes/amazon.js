const express = require('express');
const router = express.Router();

const amazonController = require('../controllers/amazon');

const { validateCreateProduct } = require('../validators/newProductCheck');


router.get('/', amazonController.getAll);

router.get('/:asin', amazonController.getSingle);

router.post('/', validateCreateProduct, amazonController.createProduct);

router.put('/:asin', validateCreateProduct, amazonController.updateProduct);

router.delete('/:asin', amazonController.deleteProduct);

module.exports = router;