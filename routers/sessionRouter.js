const express = require('express');
const sessionRouter = express.Router();

// Ruta GET para la vista de registro
sessionRouter.get('/register', (req, res) => {
    res.render('register'); 
});

// Ruta GET para la vista de login
sessionRouter.get('/login', (req, res) => {
    res.render('login');
});

module.exports = sessionRouter;