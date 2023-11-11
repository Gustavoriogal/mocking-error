// errorMiddleware.js

const CustomError = require("../managers/errorManager");


const errorMiddleware = (error, req, res, next) => {
  if (error instanceof CustomError) {
    // Si es un error personalizado, utilizamos la información del error
    const { status, message } = error;
    res.status(status).json({ error: message });
  } else {
    // Si no es un error personalizado, manejamos otros tipos de errores
    console.error('Error desconocido:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = errorMiddleware;
