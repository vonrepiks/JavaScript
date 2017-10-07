const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

let userSchema = mongoose.Schema({
    username: { type: types.String, required: true, unique: true },
    password: { type: types.String, required: true },
    createdProducts: { type: types.Array, default: [] }
});

let User = mongoose.model('User', userSchema);

module.exports = User;