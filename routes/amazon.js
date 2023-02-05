const express = require('express');
const router = express.Router();

const amazonController = require('../controllers/amazon');


//When you receive a get with '/' pass it to amazonController.getAll
router.get('/', amazonController.getAll);

router.get('/:id', amazonController.getSingle);

// TODO:  router.post SOMETHING contactsController.createContact
router.post('/', amazonController.createProduct);

// TODO: router.put SOMETHING contactsController.updateContact
router.put('/:id', amazonController.updateProduct);

// TODO: router.delete SOMETHING contactsController.deleteContact
router.delete('/:id', amazonController.deleteProduct);

module.exports = router;