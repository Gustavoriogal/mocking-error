const Product = require("../models/product");
const productRepository = require("../repositories/productRepository");


const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const skip = (page - 1) * limit;
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);
    const products = await Product.find({ /* Filtros personalizados */ })
      .skip(skip)
      .limit(parseInt(limit))
      .sort(sort === 'asc' ? 'price' : sort === 'desc' ? '-price' : null);

    const pagination = {
      totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page: page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
    };



    res.render('home', { products, user: req.user, pagination, isUser: req.user.role === 'usuario'});


  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.render('error', { message: 'Error interno del servidor' }); // Renderiza una vista de error
  }
};

const verifyStock = async () =>{
  
}




// Crear un nuevo producto
const createProduct = async (productData) => {
    return await productRepository.createProduct(productData);
}

// Eliminar un producto por su ID
const deleteProduct = async (productId) => {
    return await productRepository.deleteProduct(productId);
}

// Obtener un producto por su ID
const getProductById = async (productId) => {
    return await productRepository.getProductById(productId);
}

/* // Obtener todos los productos
const getProducts = async () => {
    return await productRepository.getProducts();
} */

// Actualizar el stock de un producto por su ID
const updateStockProduct = async (productId, stock) => {
    return await productRepository.updateStockProduct(productId, stock);
}

module.exports = {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateStockProduct,
};
