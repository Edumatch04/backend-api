import express from 'express';
import ProfessoresMateriasController from '../controllers/professoresMateriasController.js';

const router = express.Router();

router.get('/', ProfessoresMateriasController.listarProfessoresMaterias);
router.get('/:id', ProfessoresMateriasController.listarProfessorMateriaPorId);
router.post('/', ProfessoresMateriasController.cadastrarProfessorMateria);
router.put('/:id', ProfessoresMateriasController.atualizarProfessorMateria);
router.delete('/:id', ProfessoresMateriasController.excluirProfessorMateria);

export default router;
