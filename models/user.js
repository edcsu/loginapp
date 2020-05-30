const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// user schema
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    name: {
        type: String,
    },
})

let User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {
    bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
        // store hash in the db
        newUser.password = hash;
        newUser.save(callback);
    });
}