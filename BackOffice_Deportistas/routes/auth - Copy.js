const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const passport = require('passport');

//router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
// Nueva ruta para cerrar sesión
router.get('/logout', AuthController.logout);

/*router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      if (err) {
          console.error("❌ Error en autenticación:", err);
          return next(err);
      }
      if (!user) {
          console.log("⚠️ Redirigiendo con error:", info.message);
          req.flash('error', info.message);
          return res.redirect('/');
      }
      req.logIn(user, (err) => {
          if (err) {
              console.error("❌ Error en login:", err);
              return next(err);
          }
          return res.redirect('/index');
      });
  })(req, res, next);
});

//router.get('/logout', AuthController.logout);
module.exports = router;*/
/*router.post('/login', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/',
    failureFlash: 'Credenciales incorrectas'
}));*/

module.exports = router;