import express from 'express';
import MateriasController from '../controllers/materiasController.js';
import autenticarJWT from "../middleware/authMiddleware.js";

const router = express.Router();

// Definir as rotas para operações de Matérias
router.get('/', autenticarJWT, MateriasController.listarMaterias);
router.get('/:id', autenticarJWT, MateriasController.listarMateriaPorId);
router.post('/', autenticarJWT, MateriasController.cadastrarMateria);
router.put('/:id', autenticarJWT, MateriasController.atualizarMateria);
router.delete('/:id', autenticarJWT, MateriasController.excluirMateria);

export default router;
