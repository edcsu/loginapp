let express = require('express');
let router = express.Router();

// get register page 
router.get('/register', (req, res) => {
    res.render('register');
});

// get login page 
router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;