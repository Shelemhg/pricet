const express = require('express');
const router = express.Router();
const path = require('path');




// Call static pages and the public folder
router.use(express.static('public'));
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
  });



// //Experimental login page
router.get('/login', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/login.html'));
  });

router.use('/', require('./googleAuth'));

// Working googleOAuth2.0
// router.use('/login', require('./googleAuth'));


//ADDED SWAGGER ROUTES
router.use('/', require('./swagger'));
router.use('/amazon', require('./amazon'));





module.exports = router;