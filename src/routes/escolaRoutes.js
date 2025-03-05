import express from 'express';
import EscolasController from '../controllers/escolasController.js';

const router = express.Router();

// Definição das rotas, chamando os métodos corretos do controller
router.get('/', EscolasController.listarEscolas);
router.get('/:id', EscolasController.listarEscolasPorId);
router.post('/', EscolasController.cadastrarEscola);
router.put('/:id', EscolasController.atualizarEscola);
router.delete('/:id', EscolasController.excluirEscola);

export default router;
