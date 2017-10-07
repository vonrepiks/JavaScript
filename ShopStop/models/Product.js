const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

let productSchema = mongoose.Schema({
    name: { type: types.String, required: true },
    description: { type: types.String },
    price: {
        type: types.Number,
        min: 0,
        max: Number.MAX_VALUE,
        default: 0
    },
    image: { type: types.String },
    category: { type: types.ObjectId, ref: 'Category' },
    isBought: { type: types.Boolean, default: false }
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;