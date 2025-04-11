const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const User = require('./model/UserModel');

mongoose.connect('mongodb://localhost:27017/webCiclistas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Conectado a MongoDB correctamente"))
.catch(err => console.error("❌ Error al conectar con MongoDB:", err));

async function createAdminUser() {
  try {
    // Eliminar usuario existente para evitar errores de encriptación
    await User.deleteOne({ username: "admin" });

   // Encriptar correctamente la contraseña
   /*const plainPassword = "admin";
   console.log(`🔐 Contraseña antes de cifrar: ${plainPassword}`);

   const hashedPassword = await bcrypt.hash(plainPassword, 10);
   console.log(`🛠️ Hash generado: ${hashedPassword}`);

    // Crear usuario "admin" con la contraseña cifrada
    await User.create({ username: 'admin', password: hashedPassword });

    console.log('✅ Usuario admin creado correctamente.');
} catch (error) {
    console.error('❌ Error al crear el usuario admin:', error);
} finally {
    mongoose.connection.close();
}
}*/
// No ciframos manualmente, dejamos que el modelo lo haga
await User.create({ username: 'admin', password: 'admin' });

console.log('✅ Usuario admin creado correctamente.');
} catch (error) {
console.error('❌ Error al crear el usuario admin:', error);
} finally {
mongoose.connection.close();
}
}
createAdminUser();
/*async function resetAdminUser() {
    const hashedPassword = await bcrypt.hash('admin', 10);
    await User.findOneAndUpdate(
        { username: 'admin' },
        { password: hashedPassword },
        { upsert: true }
    );
    console.log('Usuario admin actualizado correctamente.');
    mongoose.connection.close();
}

resetAdminUser();*/
