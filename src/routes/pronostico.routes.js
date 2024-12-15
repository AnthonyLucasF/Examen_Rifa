import { Router } from "express";
//import {getPronosticos, getPronosticoxid, postPronostico, putPronostico, pathPronostico, deletePronostico} from '../controladores/pronosticoCtrl.js'
import {getPronosticos, getPronosticoxid, deletePronostico} from '../controladores/pronosticoCtrl.js'
import { registrarPronostico } from '../controladores/pronosticoCtrl.js';

const router=Router()

//Armar nuestras rutas
router.get('/pronostico', getPronosticos) //SELECT
router.get('/pronostico/:id', getPronosticoxid) //SELECT x ID
/* router.post('/pronostico', postPronostico) //INSERT
router.put('/pronostico/:id', putPronostico) //UPDATE
router.patch('/pronostico/:id', pathPronostico) //UPDATE */
router.delete('/pronostico/:id', deletePronostico) //DELETE

router.post('/pronosticos', registrarPronostico);

export default router