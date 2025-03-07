import express from 'express';
import ProfessoresController from '../controllers/professoresController.js';

const router = express.Router();

// Definição das rotas para professores
router.get('/', ProfessoresController.listarProfessores);
router.get('/:id', ProfessoresController.listarProfessorPorId);
router.post('/', ProfessoresController.cadastrarProfessor);
router.put('/:id', ProfessoresController.atualizarProfessor);
router.delete('/:id', ProfessoresController.excluirProfessor);

export default router;
