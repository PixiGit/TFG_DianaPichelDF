const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./model/UserModel');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(async (username, password, done) => {
  console.log(` Usuario ingresado: "${username}"`);
    console.log(` Contraseña ingresada: "${password}"`);
  console.log(`Intentando autenticar usuario: ${username}`);
    try {
        const user = await User.findOne({ username });
        if (!user) {
          console.log("❌ Usuario no encontrado.");
            return done(null, false, { message: 'Usuario no encontrado' });
        }
        console.log(`Comparando contraseña ingresada: "${password}"`);
        console.log(`con hash en BD: "${user.password}"`);
 
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔄 Comparación de contraseñas:", isMatch);
        console.log(` ¿Las contraseñas coinciden?: ${isMatch}`);
        if (!isMatch) {
          console.log("❌ Contraseña incorrecta.");
            return done(null, false, { message: 'Contraseña incorrecta' });
        }
        console.log("✅ Autenticación exitosa.");
        return done(null, user);
    } catch (error) {
      console.error("❌ Error en autenticación:", error);
        return done(error);
    }
}));

// Serialización y deserialización del usuario para que pueda continuar logeado poque esta en la sesion
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
