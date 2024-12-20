import express from 'express';

import { getContatos, getFuncionarios, patchContato, postContatos } from '../controllers/contatos.js'

const router = express.Router();

router.get('/', getContatos);
router.post('/', postContatos);
router.patch('/:idcontato', patchContato);
router.get('/funcionarios', getFuncionarios);

export default router;