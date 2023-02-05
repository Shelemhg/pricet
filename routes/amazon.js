const express = require('express');
const router = express.Router();

const amazonController = require('../controllers/amazon');

// Creates a new Router instance and registers a GET request handler for the '/' route. Then the "contactsController.getAll" handler function is passed to the get methig.

// //When you receive a get with '/' pass it to contactsController.getAll
// router.get('/', amazonController.getAll);

// router.get('/:id', amazonController.getSingle);

// // TODO:  router.post SOMETHING amazonController.createProduct
// router.post('/', amazonController.createProduct);

// // TODO: router.put SOMETHING amazonController.updateProduct
// router.put('/:id', amazonController.updateProduct);

// // TODO: router.delete SOMETHING amazonController.deleteProduct
// router.delete('/:id', amazonController.deleteProduct);

module.exports = router;