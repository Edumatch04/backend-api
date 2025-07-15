import express from 'express';
import FuncionariosController from '../components/auth/controller/funcionariosController.js';
import autenticarJWT from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', autenticarJWT, FuncionariosController.listarFuncionarios);
router.get('/:id', autenticarJWT, FuncionariosController.listarFuncionariosPorId);
router.post('/', autenticarJWT, FuncionariosController.cadastrarFuncionario);
router.put('/:id', autenticarJWT, FuncionariosController.atualizarFuncionario);
router.delete('/:id', autenticarJWT, FuncionariosController.excluirFuncionario);

export default router;
