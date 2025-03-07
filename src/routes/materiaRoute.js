import express from 'express';
import MateriasController from '../controllers/materiasController.js';

const router = express.Router();

// Definir as rotas para operações de Matérias
router.get('/', MateriasController.listarMaterias);
router.get('/:id', MateriasController.listarMateriaPorId);
router.post('/', MateriasController.cadastrarMateria);
router.put('/:id', MateriasController.atualizarMateria);
router.delete('/:id', MateriasController.excluirMateria);

export default router;
