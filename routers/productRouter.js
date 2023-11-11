const express = require('express');
const ERRORS = require('../handlers/errorHandler'); // Asegúrate de tener la ruta correcta
const productController = require('../dao/controllers/productController');
const CustomError = require('../managers/errorManager');


const routerProducts = express.Router();

routerProducts.get('/', async (req, res) => {
  try {
    const result = await productController.getProducts();
    res.status(200).json(result);
  } catch (error) {
    const customError = new CustomError(ERRORS.INTERNAL_SERVER_ERROR.message, ERRORS.INTERNAL_SERVER_ERROR.status);
    res.status(customError.status).json({ error: customError.message });
  }
});

routerProducts.get('/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productController.getProductById(pid);
    res.status(200).json(product);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ error: error.message });
    } else {
      const customError = new CustomError(ERRORS.INTERNAL_SERVER_ERROR.message, ERRORS.INTERNAL_SERVER_ERROR.status);
      res.status(customError.status).json({ error: customError.message });
    }
  }
});

routerProducts.post('/', async (req, res) => {
  try {
    const newProduct = req.body;
    const response = await productController.createProduct(newProduct);
    res.status(200).json(response);
  } catch (error) {
    const customError = new CustomError(ERRORS.INTERNAL_SERVER_ERROR.message, ERRORS.INTERNAL_SERVER_ERROR.status);
    res.status(customError.status).json({ error: customError.message });
  }
});

routerProducts.put('/:pid', async (req, res) => {
  try {
    const updatedProduct = req.body;
    const { pid } = req.params;
    const response = await productController.updateProductById(pid, updatedProduct);
    res.status(200).json(response);
  } catch (error) {
    const customError = new CustomError(ERRORS.INTERNAL_SERVER_ERROR.message, ERRORS.INTERNAL_SERVER_ERROR.status);
    res.status(customError.status).json({ error: customError.message });
  }
});

routerProducts.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await productController.deleteProduct(pid);
    res.status(200).json(response);
  } catch (error) {
    const customError = new CustomError(ERRORS.INTERNAL_SERVER_ERROR.message, ERRORS.INTERNAL_SERVER_ERROR.status);
    res.status(customError.status).json({ error: customError.message });
  }
});

module.exports = routerProducts;
