import { Router } from "express";
//import {getPartidos, getPartidosxid, postPartido, putPartido, pathPartido, deletePartido} from '../controladores/partidoCtrl.js'
import {getPartidos, getPartidosxid, deletePartido} from '../controladores/partidoCtrl.js'
import { actualizarResultado, listarAcertaron, listarEquipos, mostrarGanador, obtenerPartidosActivos, registrarPartido } from '../controladores/partidoCtrl.js';
import { obtenerResultado } from '../controladores/pronosticoCtrl.js';

const router=Router()

//Armar nuestras rutas
router.get('/partido', getPartidos) //SELECT
router.get('/partido/:id', getPartidosxid) //SELECT x ID
/* router.post('/partido', postPartido) //INSERT
router.put('/partido/:id', putPartido) //UPDATE
router.patch('/partido/:id', pathPartido) //UPDATE */
router.delete('/partido/:id', deletePartido) //DELETE

router.post('/partidos', registrarPartido);
router.put('/partidos/:id_par/resultado', actualizarResultado);
router.get('/partidos/:id_par/acertaron', listarAcertaron);
router.get('/partidos/:id_par/ganador', mostrarGanador);
router.get('/equipos', listarEquipos);
router.get('/partidos-activos', obtenerPartidosActivos);
router.get('/resultado', obtenerResultado);

export default router