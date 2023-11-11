const TicketService = require('../repositories/ticketRepository')
const Cart = require("../models/cart");
const Product = require("../models/product");
const mongoose = require('mongoose')

class CartRepository {
  async createCart() {
    const newCart = new Cart({ id: 1, products: [] }); // Puedes ajustar el ID inicial según tus necesidades
    await newCart.save();
    return newCart;
  }

  async getCartById(cid) {
    const cart = await Cart.findOne({ id: cid });
    return cart;
  }

  async updateCart(cart) {
    const updatedCart = await cart.save();
    return updatedCart;
  }
  async addProductCart(cid, pid) {
    try {
       let cartSelected = await Cart.findById(cid)
   
 
        // Si el producto ya existe en el carrito, incrementa su cantidad en 1
        const existingProductIndex = cartSelected.products.findIndex(product => product.id == pid)
        if (existingProductIndex !== -1) {
          cartSelected.products[existingProductIndex].quantity += 1
        } else {
          // Si el producto no existe en el carrito, añádelo con una cantidad de 1
          cartSelected.products.push({ id: pid, quantity: 1 })
        }
       // Guarda los cambios en el carrito
       await cartSelected.save()
       return true
    } catch (error) {
       console.error('Error al agregar producto al carrito:', error)
       throw error
    }
   }
    getCartPopulated = async (cid) => {
    try {
      // Verifica que el ID de carrito sea válido
      if (!mongoose.Types.ObjectId.isValid(cid)) {
        return null; // ID inválido
      }
  
      // Ejecuta la consulta findOne con populate
      const cart = await Cart.findOne({ _id: cid })
        .populate({ path: 'products.id', model: 'Product' });
  
      if (!cart) {
        return null; // El carrito no existe
      }
  
      return cart;
    } catch (error) {
      console.error('Error al obtener el carrito populado:', error);
      throw error;
    }
  };

  async buyCart(cid, email) {
    const cart = await Cart.findById(cid).populate('products.id');
    const productsToUpdate = [];
    const productsNotProcessed = []; // Almacena los productos que no se pudieron procesar
  
    // Recorre los productos del carrito
    for (const productItem of cart.products) {
      const product = productItem.id;
      const requestedQuantity = productItem.quantity;
  
      // Obtiene el producto actualizado desde la base de datos
      const updatedProduct = await Product.findById(product);
  
      if (updatedProduct.stock >= requestedQuantity) {
        // Resta la cantidad comprada al stock del producto
        updatedProduct.stock -= requestedQuantity;
        productsToUpdate.push(updatedProduct);
      } else {
        // Si el producto no tiene suficiente stock, añádelo a los productos no procesados
        productsNotProcessed.push(product);
      }
    }
  
    // Realiza la actualización de los productos en la base de datos
    const productUpdates = productsToUpdate.map((product) =>
      Product.findByIdAndUpdate(product._id, { stock: product.stock }, { new: true })
    );
  
    // Espera a que se completen todas las actualizaciones
    await Promise.all(productUpdates);
  
    // Calcula el monto total de la compra
    const totalAmount = cart.products.reduce((total, productItem) => {
      const product = productsToUpdate.find((p) => p._id.equals(productItem.id._id));
      return total + (product ? product.price : 0) * productItem.quantity;
    }, 0);
  
    // Crea un ticket para la compra
    const ticket = await TicketService.generateTicket(email, totalAmount); // Utiliza el servicio de Tickets
  
    // Filtra los productos no procesados para actualizar el carrito
    const filteredProducts = cart.products.filter(
      (productItem) => !productsNotProcessed.includes(productItem.id.toString())
    );
  
    cart.products = filteredProducts;

    cart.products = []
  
    // Actualiza el carrito en la base de datos
    await cart.save();
  
    return productsNotProcessed;
  }
  
}

module.exports = new CartRepository();
