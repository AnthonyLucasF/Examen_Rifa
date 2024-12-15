import { conmysql } from '../db.js';

export const login = async (req, res) => {
  const { usuario, clave } = req.body;

  if (!usuario || !clave) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
  }

  try {
    // Consulta para obtener el usuario por su nombre de usuario
    const [rows] = await conmysql.execute('SELECT * FROM usuario WHERE usuario = ?', [usuario]);

    // Si no se encuentra el usuario, retornamos un error 401
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = rows[0];

    // Comparar la contraseña recibida con la que tenemos en la base de datos (en texto plano)
    if (clave !== user.clave) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Si la contraseña es correcta, retornamos el éxito
    res.status(200).json({
      message: 'Login exitoso',
      userId: user.id_usr,
      role: user.per_id === 1 ? 'Administrador' : 'Usuario Normal',
    });

  } catch (error) {
    res.status(500).json({ message: 'Error al autenticar', error });
  }
};