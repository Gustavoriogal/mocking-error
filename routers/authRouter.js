const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt'); // Añade esta importación para hashear contraseñas
const User = require('../dao/models/user');
const CartController = require('../dao/controllers/cartController');
const router = express.Router();

// Ruta GET para la vista de registro
router.get('/register', (req, res) => {
  res.render('register', { errorMessage: req.flash('error') });
});

// Ruta POST para procesar el registro
router.post('/register', async (req, res) => {
  try {
    // Obtiene los datos del formulario de registro
    const { first_name, last_name, email, age, password } = req.body;

    // Verifica si el correo ya está en uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'El correo ya está registrado');
      return res.redirect('/session/register');
    }

    // Hashea la contraseña antes de guardarla
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crea un nuevo usuario con la contraseña hasheada
    const newCart = await CartController.createCart()
    const newUser = new User({ first_name, last_name, email, age, password: hashedPassword, cart: newCart._id});

    // Guarda el usuario en la base de datos
    await newUser.save();

    req.login(newUser, (err) => {
      if (err) {
        req.flash('error', 'Error en el registro');
        return res.redirect('/session/register');
      }
      return res.redirect('/products');
    });
  } catch (error) {
    console.error('Error en el registro:', error);
    req.flash('error', 'Error en el registro');
    return res.redirect('/session/register');
  }
});

// Ruta GET para la vista de inicio de sesión
router.get('/login', (req, res) => {
  res.render('login', { errorMessage: req.flash('error') });
});

// Ruta POST para procesar la autenticación
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/products', 
    failureRedirect: '/session/login',
    failureFlash: true, // Asegúrate de que esta opción esté habilitada para mostrar mensajes flash en caso de fallo
  })
);

// Ruta GET para cerrar sesión
router.get('/logout', (req, res) => {
  req.logout(); // Cierra la sesión
  res.redirect('/session/login'); // Redirige al usuario a la vista de inicio de sesión
});

module.exports = router;
