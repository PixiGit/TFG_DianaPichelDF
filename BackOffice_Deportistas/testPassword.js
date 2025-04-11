const bcrypt = require('bcrypt');

const storedHash = "$2b$10$ts6xp23z7vY97SjqfpBeO.nb5Ol0ZI26dgNob0nCZZCdwY9bFMP9y"; // Hash almacenado en MongoDB
const password = "admin"; // Contraseña introduce usuario

bcrypt.compare(password, storedHash, (err, result) => {
    if (err) {
        console.error("Error en comparación:", err);
    } else {
        console.log("¿Las contraseñas coinciden?", result);
    }
});
