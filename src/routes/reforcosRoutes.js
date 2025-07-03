import express from 'express';
import ReforcosController from '../components/escolas/controller/reforcosController.js';
import autenticarJWT from "../middleware/authMiddleware.js";
import autenticarProfessor from "../middleware/autenticarProfessor.js";

const router = express.Router();

// Rotas principais
router.post('/', autenticarJWT, ReforcosController.criarReforco);
router.get('/', autenticarJWT, ReforcosController.listarReforcos);
router.get('/:id', autenticarJWT, ReforcosController.obterReforco);
router.put('/:id', autenticarJWT, ReforcosController.atualizarReforco);
router.delete('/:id', autenticarJWT, ReforcosController.excluirReforco);

// Conteúdos
router.post('/:reforco_id/conteudos', autenticarJWT, ReforcosController.adicionarConteudo);

// Materiais
router.post('/:reforco_id/materiais', autenticarJWT, ReforcosController.adicionarMaterial);

// Testes
router.post('/materiais/:material_id/testes', autenticarJWT, ReforcosController.adicionarTeste);

// Alunos
router.post('/:reforco_id/alunos', autenticarJWT, ReforcosController.adicionarAlunos);

export default router;