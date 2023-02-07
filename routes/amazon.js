const express = require('express');
const router = express.Router();

const amazonController = require('../controllers/amazon');


//When you receive a get with '/' pass it to amazonController.getAll
router.get('/', amazonController.getAll);

router.get('/:asin', amazonController.getSingle);

router.post('/', amazonController.createProduct);

// TODO: router.put SOMETHING amazonController.updateProduct
router.put('/:id', amazonController.updateProduct);

// TODO: router.delete SOMETHING amazonController.deleteProduct
router.delete('/:id', amazonController.deleteProduct);

module.exports = router;