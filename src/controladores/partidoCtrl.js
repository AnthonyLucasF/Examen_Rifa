import { conmysql } from "../db.js"

export const getPartidos =
    async (req, res) => {
        try {
            const [result] = await conmysql.query(' SELECT * FROM partido')
            res.json(result)
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Partidos" })
        }
    }

export const getPartidosxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM partido WHERE id_par=?', [req.params.id])
            if (result.length <= 0) return res.status(404).json({
                id_par: 0,
                message: "Partido no encontrado"
            })
            res.json(result[0])
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }

/* export const postPartido =
    async (req, res) => { 
        try {
            const { eq_uno, eq_dos, fecha_par, id_res, estado_par } = req.body
            const [rows] = await conmysql.query('INSERT INTO partido (eq_uno, eq_dos, fecha_par, id_res, estado_par) VALUES(?,?,?,?,?)',
                [eq_uno, eq_dos, fecha_par, id_res, estado_par])
            res.send({
                id: rows.insertId
            })
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }

export const putPartido =
    async (req, res) => {
        try {
            const { id } = req.params
            const { eq_uno, eq_dos, fecha_par, id_res, estado_par } = req.body
            const [result] = await conmysql.query('UPDATE partido SET eq_uno=?, eq_dos=?, fecha_par=?, id_res=?, estado_par=? WHERE id_par=?',
                [eq_uno, eq_dos, fecha_par, id_res, estado_par, id])
            if (result.affectedRows <= 0) return res.status(404).json({ message: "Partido no encontrado" })

            const [rows] = await conmysql.query('SELECT * FROM partido WHERE id_par=?', [id])
            res.json(rows[0])
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }

export const pathPartido =
    async (req, res) => {
        try {
            const { id } = req.params
            const { eq_uno, eq_dos, fecha_par, id_res, estado_par } = req.body
            const [result] = await conmysql.query('UPDATE partido SET eq_uno=IFNULL(?, eq_uno), eq_dos=IFNULL(?, eq_dos), fecha_par=IFNULL(?, fecha_par), id_res=IFNULL(?, id_res), estado_par=IFNULL(?, estado_par) WHERE id_par=?',
                [eq_uno, eq_dos, fecha_par, id_res, estado_par, id])
            if (result.affectedRows <= 0) return res.status(404).json({ message: "Partido no encontrado" })

            const [rows] = await conmysql.query('SELECT * FROM partido WHERE id_par=?', [id])
            res.json(rows[0])
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    } */

export const deletePartido =
    async (req, res) => {
        try {
            const [rows] = await conmysql.query('DELETE FROM partido WHERE id_par=?', [req.params.id])
            if (rows.affectedRows <= 0) return res.status(404).json({
                id: 0,
                message: "No se pudo eliminar al Equipo"
            })
            res.sendStatus(202)
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }


export const registrarPartido = async (req, res) => {
    const { eq_uno, eq_dos, fecha_par } = req.body;
  
    try {
      // Verificar que los equipos existen
      const [equipos] = await conmysql.execute(
        'SELECT * FROM equipo WHERE id_eq IN (?, ?)',
        [eq_uno, eq_dos]
      );
  
      if (equipos.length !== 2) {
        return res.status(400).json({ message: 'Uno o ambos equipos no existen' });
      }
  
      // Insertar el partido
      await conmysql.execute(
        'INSERT INTO partido (eq_uno, eq_dos, fecha_par, estado_par) VALUES (?, ?, ?, ?)',
        [eq_uno, eq_dos, fecha_par, 'activo']
      );
  
      res.status(201).json({ message: 'Partido registrado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al registrar el partido', error });
    }
  };
  

export const listarEquipos = async (req, res) => {
    try {
      // Obtener todos los equipos de la base de datos
      const [equipos] = await conmysql.execute('SELECT id_eq, nombre_eq FROM equipo');
    
      // Si no hay equipos, retornar un mensaje
      if (equipos.length === 0) {
        return res.status(404).json({ message: 'No se encontraron equipos' });
      }
    
      // Retornar la lista de equipos
      res.status(200).json(equipos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los equipos', error });
    }
  };
  

export const actualizarResultado = async (req, res) => {
    const { id_par } = req.params;
    const { id_res } = req.body; // id_res es el resultado, 1=Local, 2=Visitante, 3=Empate
  
    try {
      const [result] = await conmysql.execute(
        'UPDATE partido SET id_res = ?, estado_par = ? WHERE id_par = ?',
        [id_res, 'cerrado', id_par]
      );
      res.status(200).json({ message: 'Resultado actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el resultado', error });
    }
  };

  export const listarAcertaron = async (req, res) => {
    const { id_par } = req.params;
  
    try {
      const [rows] = await conmysql.execute(
        `SELECT u.id_usr, u.nombres, p.valor
         FROM pronostico p
         JOIN usuario u ON u.id_usr = p.id_usr
         WHERE p.id_par = ? AND p.id_res = (SELECT id_res FROM partido WHERE id_par = ? AND estado_par = 'cerrado')`,
        [id_par, id_par]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Nadie acertó el pronóstico' });
      }
  
      res.status(200).json({ acertaron: rows });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los acertantes', error });
    }
  };

  export const mostrarGanador = async (req, res) => {
    const { id_par } = req.params;
  
    try {
      const [rows] = await conmysql.execute(
        `SELECT u.nombres, p.valor
         FROM pronostico p
         JOIN usuario u ON u.id_usr = p.id_usr
         WHERE p.id_par = ? AND p.id_res = (SELECT id_res FROM partido WHERE id_par = ? AND estado_par = 'cerrado')`,
        [id_par, id_par]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'No hay ganadores' });
      }
  
      const totalMonto = rows.reduce((acc, curr) => acc + curr.valor, 0);
      res.status(200).json({ ganadores: rows, montoTotal: totalMonto });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el ganador', error });
    }
  };

  export const obtenerPartidosActivos = async (req, res) => {
    try {
      const [result] = await conmysql.execute(
        `SELECT 
          p.id_par,
          e1.nombre_eq AS equipo_1,
          e2.nombre_eq AS equipo_2,
          p.fecha_par
         FROM partido p
         JOIN equipo e1 ON p.eq_uno = e1.id_eq
         JOIN equipo e2 ON p.eq_dos = e2.id_eq
         WHERE p.fecha_par > NOW();`
      );
      res.status(200).json(result);  // Retorna los partidos activos
    } catch (error) {
      res.status(500).json({ message: 'Error al recuperar los partidos activos', error });
    }
  };
  