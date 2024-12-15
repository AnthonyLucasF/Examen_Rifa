import { conmysql } from "../db.js"

export const getUsuarios=
    async (req, res)=>{
        try {
            const [result]= await conmysql.query(' SELECT * FROM usuario')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar Usuario"})
        }
    }

export const getUsuariosxid=
    async (req, res)=>{
        try {
            const [result] = await conmysql.query('SELECT * FROM usuario WHERE id_usr=?', [req.params.id])
            if(result.length<=0) return res.status(404).json({
                id_usr: 0,
                message: "Usuario no encontrado"
            })
            res.json(result[0])
        } catch (error) {
            return res.status(500).json({message: "Error del Servidor"})
        }
    }

export const postUsuario=
    async (req, res)=>{ 
        try {
            const {cedula, nombres, direccion, telefono, fecha_registro}=req.body
            const[rows]= await conmysql.query('INSERT INTO usuario (cedula, nombres, direccion, telefono, fecha_registro) VALUES(?,?,?,?,?)', 
                                            [cedula, nombres, direccion, telefono, fecha_registro])
            res.send({
                id:rows.insertId
            })
        } catch (error) {
            return res.status(500).json({message: "Error del Servidor"})
        }
    }

export const putUsuario=
    async (req, res)=>{
        try {
            const {id}= req.params
            const {cedula, nombres, direccion, telefono, fecha_registro}=req.body
            const[result]= await conmysql.query('UPDATE usuario SET cedula=?, nombres=?, direccion=?, telefono=?, fecha_registro=? WHERE id_usr=?', 
                                            [cedula, nombres, direccion, telefono, fecha_registro, id])
            if(result.affectedRows<=0) return res.status(404).json({message: "Usuario no encontrado"})

            const[rows]= await conmysql.query('SELECT * FROM usuario WHERE id_usr=?', [id])
            res.json(rows[0])
        } catch (error) {
            return res.status(500).json({message: "Error del Servidor"})
        }
    }

export const pathUsuario=
async (req, res)=>{
    try {
        const {id}= req.params
        const {cedula, nombres, direccion, telefono, fecha_registro}=req.body
        const[result]= await conmysql.query('UPDATE usuario SET cedula=IFNULL(?, cedula), nombres=IFNULL(?, nombres), direccion=IFNULL(?, direccion), telefono=IFNULL(?, telefono), fecha_registro=IFNULL(?, fecha_registro) WHERE id_usr=?', 
                                        [cedula, nombres, direccion, telefono, fecha_registro, id])
        if(result.affectedRows<=0) return res.status(404).json({message: "Usuario no encontrado"})

        const[rows]= await conmysql.query('SELECT * FROM usuario WHERE id_usr=?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: "Error del Servidor"})
    }
}

export const deleteUsuario=
async (req, res)=>{
    try {
        const[rows]= await conmysql.query('DELETE FROM usuario WHERE id_usr=?', [req.params.id])
        if(rows.affectedRows<=0) return res.status(404).json({
            id:0,
            message: "No se pudo eliminar al Usuario"
        })
        res.sendStatus(202)
    } catch (error) {
        return res.status(500).json({message: "Error del Servidor"})
    }
}
