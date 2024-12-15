import { conmysql } from "../db.js"

export const getPronosticos =
    async (req, res) => {
        try {
            const [result] = await conmysql.query(' SELECT * FROM pronostico')
            res.json(result)
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Pronosticos" })
        }
    }

export const getPronosticoxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM pronostico WHERE id_pron=?', [req.params.id])
            if (result.length <= 0) return res.status(404).json({
                id_pron: 0,
                message: "Pronostico no encontrado"
            })
            res.json(result[0])
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }

/* export const postPronostico =
    async (req, res) => { 
        try {
            const { id_usr, id_par, id_res, valor, fecha_registro } = req.body
            const [rows] = await conmysql.query('INSERT INTO pronostico (id_usr, id_par, id_res, valor, fecha_registro) VALUES(?,?,?,?,?)',
                [id_usr, id_par, id_res, valor, fecha_registro])
            res.send({
                id: rows.insertId
            })
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }

export const putPronostico =
    async (req, res) => {
        try {
            const { id } = req.params
            const { id_usr, id_par, id_res, valor, fecha_registro } = req.body
            const [result] = await conmysql.query('UPDATE pronostico SET eq_uno=?, eq_dos=?, fecha_par=?, id_res=?, estado_par=? WHERE id_par=?',
                [id_usr, id_par, id_res, valor, fecha_registro, id])
            if (result.affectedRows <= 0) return res.status(404).json({ message: "Partido no encontrado" })

            const [rows] = await conmysql.query('SELECT * FROM partido WHERE id_par=?', [id])
            res.json(rows[0])
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }

export const pathPronostico =
    async (req, res) => {
        try {
            const { id } = req.params
            const { id_usr, id_par, id_res, valor, fecha_registro } = req.body
            const [result] = await conmysql.query('UPDATE pronostico SET id_usr=IFNULL(?, id_usr), id_par=IFNULL(?, id_par), id_res=IFNULL(?, id_res), valor=IFNULL(?, valor), fecha_registro=IFNULL(?, fecha_registro) WHERE id_pron=?',
                [id_usr, id_par, id_res, valor, fecha_registro, id])
            if (result.affectedRows <= 0) return res.status(404).json({ message: "Pronostico no encontrado" })

            const [rows] = await conmysql.query('SELECT * FROM pronostico WHERE id_pron=?', [id])
            res.json(rows[0])
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    } */

export const deletePronostico =
    async (req, res) => {
        try {
            const [rows] = await conmysql.query('DELETE FROM pronostico WHERE id_pron=?', [req.params.id])
            if (rows.affectedRows <= 0) return res.status(404).json({
                id: 0,
                message: "No se pudo eliminar al Pronostico"
            })
            res.sendStatus(202)
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }

export const registrarPronostico = async (req, res) => {
    const { id_usr, id_par, id_res, valor } = req.body;
  
    // Aseguramos que el id_usr sea válido, si no lo es, se asigna un valor por defecto (id_usr = 2)
    const usuario = id_usr || 2; 
  
    // Verificamos que los demás campos sean válidos
    if (!id_par || !id_res || valor == null) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }
  
    try {
      const [result] = await conmysql.execute(
        'INSERT INTO pronostico (id_usr, id_par, id_res, valor, fecha_registro) VALUES (?, ?, ?, ?, NOW())',
        [usuario, id_par, id_res, valor]
      );
      res.status(201).json({ message: 'Pronóstico registrado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar el pronóstico', error });
    }
  };


  export const obtenerResultado = async (req, res) => {
    try {
      // Recupera todos los resultados disponibles
      const [results] = await conmysql.execute(
        'SELECT id_res, descripcion_res FROM resultado'
      );
      res.status(200).json(results);  // Devuelve todos los resultados disponibles
    } catch (error) {
      res.status(500).json({ message: 'Error al recuperar los resultados', error });
    }
  };
  