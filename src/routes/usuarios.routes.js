import { Router } from "express";
import {getUsuarios, getUsuariosxid, postUsuario, putUsuario, pathUsuario, deleteUsuario} from '../controladores/usuarioCtrl.js'

const router=Router()

//Armar nuestras rutas
router.get('/usuario', getUsuarios) //SELECT
router.get('/usuario/:id', getUsuariosxid) //SELECT x ID
router.post('/usuario', postUsuario) //INSERT
router.put('/usuario/:id', putUsuario) //UPDATE
router.patch('/usuario/:id', pathUsuario) //UPDATE
router.delete('/usuario/:id', deleteUsuario) //DELETE

export default router