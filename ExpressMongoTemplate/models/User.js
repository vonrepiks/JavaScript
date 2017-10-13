const mongoose = require('mongoose');
const encryption = require('../utility/encryption');
let types = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    username: {type: types.String, required: true, unique: true},
    hashPass: {type: types.String, required: true},
    firstName: {type: types.String},
    lastName: {type: types.String},
    salt: {type: types.String},
    roles: [{}]
});

userSchema.method({
   authenticate: function(password) {
       return encryption.generateHashedPassword(this.salt, password) === this.hashPass;
   }
});

let User = mongoose.model('User', userSchema);

module.exports = User;

module.exports.seedAdmin = () => {
    User.find().then((users) => {
        if (users.length > 0) {
            return;
        }
        let salt = encryption.generateSalt();
        let hashedPass = encryption.generateHashedPassword(salt, '123');
        User.create({
            username: 'ico',
            hashPass: hashedPass,
            firstName: `Hristo`,
            lastName: 'Skipernov',
            salt: salt,
            roles: ['Admin']
        });
    }).catch();
};