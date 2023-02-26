const express = require('express');
const router = express.Router();
const path = require('path');

// Working googleOAuth2.0
router.use('/login', require('./googleAuth'));


//ADDED SWAGGER ROUTES
router.use('/', require('./swagger'));
router.use('/amazon', require('./amazon'));

// router.use(express.static(path.join(__dirname, '/public')));
// router.use(express.static(path.resolve(__dirname, "public")));
router.use(express.static('public'));
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
  });



module.exports = router;