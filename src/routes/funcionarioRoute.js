import express from 'express';
import FuncionariosController from '../controllers/funcionariosController.js';

const router = express.Router();

// Definição das rotas, chamando os métodos corretos do controller
router.get('/', FuncionariosController.listarFuncionarios);
router.get('/:id', FuncionariosController.listarFuncionariosPorId);
router.post('/', FuncionariosController.cadastrarFuncionario);
router.put('/:id', FuncionariosController.atualizarFuncionario);
router.delete('/:id', FuncionariosController.excluirFuncionario);

export default router;
