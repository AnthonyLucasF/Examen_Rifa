import { Router } from "express";
import {getResultados, getResultadosxid, postResultado, putResultado, pathResultado, deleteResultado} from '../controladores/resultadoCtrl.js'

const router=Router()

//Armar nuestras rutas
router.get('/resultado', getResultados) //SELECT
router.get('/resultado/:id', getResultadosxid) //SELECT x ID
router.post('/resultado', postResultado) //INSERT
router.put('/resultado/:id', putResultado) //UPDATE
router.patch('/resultado/:id', pathResultado) //UPDATE
router.delete('/resultado/:id', deleteResultado) //DELETE

export default router