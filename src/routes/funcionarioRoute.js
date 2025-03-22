import express from 'express';
import FuncionariosController from '../controllers/funcionariosController.js';
import autenticarJWT from "../middleware/authMiddleware.js";

const router = express.Router();

// Definição das rotas, chamando os métodos corretos do controller
router.get('/', autenticarJWT, FuncionariosController.listarFuncionarios);
router.get('/:id', autenticarJWT, FuncionariosController.listarFuncionariosPorId);
router.post('/', autenticarJWT, FuncionariosController.cadastrarFuncionario);
router.put('/:id', autenticarJWT, FuncionariosController.atualizarFuncionario);
router.delete('/:id', autenticarJWT, FuncionariosController.excluirFuncionario);

export default router;
