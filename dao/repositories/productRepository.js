
const Product = require("../models/product");



class ProductRepository {
  async createProduct(productData) {
    const newProduct = new Product(productData);
    return await newProduct.save();
  }

  async deleteProduct(productId) {
    return await Product.findByIdAndRemove(productId);
  }

  async getProductById(productId) {
    return await Product.findById(productId);
  }

  async getProducts() {
    return await Product.find({});
  }

  async updateStockProduct(productId, stock) {
    return await Product.findByIdAndUpdate(productId, { stock });
  }
}

module.exports = new ProductRepository();
