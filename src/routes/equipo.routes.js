import { Router } from "express";
import {getEquipos, getEquiposxid, postEquipo, putEquipo, pathEquipo, deleteEquipo} from '../controladores/equipoCtrl.js'

const router=Router()

//Armar nuestras rutas
router.get('/equipo', getEquipos) //SELECT
router.get('/equipo/:id', getEquiposxid) //SELECT x ID
router.post('/equipo', postEquipo) //INSERT
router.put('/equipo/:id', putEquipo) //UPDATE
router.patch('/equipo/:id', pathEquipo) //UPDATE
router.delete('/equipo/:id', deleteEquipo) //DELETE

export default router