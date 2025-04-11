const User = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
    // Asegurar que la contraseña se encripta antes de guardarla
    //const hashedPassword = await bcrypt.hash(password, 10);
          
    //const user = new User({ username, password: hashedPassword });
    //pasr conraeña en texto plano
    const user = new User({ username, password });
    //el modelo sera el encargado de cifrarla
    await user.save();
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
      const { username, password } = req.body;

      console.log("Intento de login:", username, password); // Depuración

      // Buscar el usuario en la base de datos
      const user = await User.findOne({ username });

      if (!user) {
          console.log("❌ Usuario no encontrado.");
          //req.flash('error', 'Credenciales incorrectas');
          //return res.redirect('/');
          return res.render('login', { error: 'Credenciales incorrectas' });
      }

      // Comparar la contraseña ingresada con la encriptada en la base de datos
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("¿Contraseña correcta?", isMatch); // Depuración

      if (!isMatch) {
          console.log("❌ Contraseña incorrecta.");
          //req.flash('error', 'Credenciales incorrectas');
          return res.render('login', { error: 'Credenciales incorrectas' });
          return res.redirect('/');
      }

      // Generar token de autenticación
      const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });
      //res.cookie('token', token, { httpOnly: true });

      console.log("✅ Inicio de sesión exitoso.");
      // Guardar el token en las cookies correctamente
      res.cookie('token', token, {
        httpOnly: true,
        secure: false, // Si se usa HTTPS, cámbiar a true
        //sameSite: 'Strict', // Evita problemas con envío de cookies entre dominios
        //sameSite:'None', // Permite que el navegador no la bloquee por políticas de seguridad
        sameSite: 'Lax', // Evita bloqueos por políticas de seguridad
        maxAge: 3600000 // 1 hora
    });

    console.log("✅ Token generado y guardado en cookies:", token);
    //res.redirect('/index');
    res.redirect('/backoffice/ciclistas');
      
  } catch (error) {
      console.error("❌ Error en login:", error);
      res.status(500).json({ error: error.message });
  }
};

exports.logout=(req,res)=>{
  res.clearCookie('token'); //eliminan token de autenticacion
  req.logout(()=>{//si se usa passport para sesiones
  res.redirect('/backoffice');
});

};