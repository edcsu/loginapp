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
    bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
        // store hash in the db
        newUser.password = hash;
        newUser.save(callback);
    });
}

module.exports.getUserByUsername = (username, callback) => {
    let query = { username };
    User.findOne(query, callback);
}

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) {
            throw err;
        }
        callback(null, isMatch)
    });
}