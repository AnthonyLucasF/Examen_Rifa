import { Router } from 'express';
import { login } from '../controladores/loginCtrl.js';

const router = Router();

router.post('/login', login);

export default router;
