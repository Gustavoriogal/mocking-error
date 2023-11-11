const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'administrador') {
    // El usuario es administrador, permitir el acceso
    return next();
  }
  // Si no es administrador, redirigir o mostrar un mensaje de error
  res.status(403).json({ message: 'Acceso denegado para administradores.' });
};

const isUser = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'usuario') {
    // El usuario es un usuario regular, permitir el acceso
    return next();
  }
  // Si no es usuario, redirigir o mostrar un mensaje de error
  res.status(403).json({ message: 'Acceso denegado para usuarios.' });
};


module.exports = {isAdmin, isUser}