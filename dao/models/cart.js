const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    id: Number,
    products: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Establece una referencia al modelo Product
            },
            quantity: Number,
        },
    ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
