const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log("Revisando cookies en la petición:", req.cookies);
  const token = req.cookies.token;
  if (!token) {
      console.log("🔴 No hay token, redirigiendo al login.");
      return res.redirect('/');
  }

  try {
      const verified = jwt.verify(token, 'secreto');
      req.user = verified;
      console.log("✅ Token verificado, acceso permitido.");
      next();
  } catch (error) {
      console.log("❌ Token inválido o expirado.");
      res.clearCookie('token'); // Eliminar la cookie inválida
      res.redirect('/');
  }
};