const express = require('express');
const router = express.Router();
//ADDED SWAGGER ROUTES
router.use('/', require('./swagger'));
router.use('/amazon', require('./amazon'));

module.exports = router;