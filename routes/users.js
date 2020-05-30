const express = require('express');
const router = express.Router();
const { check, body, validationResult } = require('express-validator');
const User =  require('../models/user')

// get register page 
router.get('/register', (req, res) => {
    res.render('register');
});

// post to register page 
router.post('/register',[
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    body('password2').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
    })
] ,function(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('register', { errors: errors.array() });
    } else {
        let newUser = new User ({
            name,
            email,
            username,
            password
        }) 

        User.createUser(newUser, function (err, user) {
            if (err) {
                throw err
            }
            console.log(user)
        })

        req.flash('success_msg', 'You are registered and can now login.')

        res.redirect('/users/login');
    }
});

// get login page 
router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;