const mongoose = require('mongoose')





const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true}, 
    price: {type: Number, required: true},
    code: {type: String, required: true},
    stock: {type: Number, required: true},
    thumbnail: {type: String, required: false},
    id: {type: String, required: false}
})




const Product = mongoose.model('Product', productSchema)

module.exports = Product