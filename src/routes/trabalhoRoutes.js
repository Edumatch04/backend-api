import express from 'express';
import TrabalhosController from '../components/escolas/controller/trabalhosController.js';
import autenticarJWT from "../middleware/authMiddleware.js";
import autenticarProfessor from "../middleware/autenticarProfessor.js"; 

const router = express.Router();

router.post('/materia', TrabalhosController.selecionarMateria);
router.post('/criar', TrabalhosController.criarTrabalho);
router.get("/", TrabalhosController.listarTrabalhos);
router.put("/:id", TrabalhosController.atualizarTrabalho);
router.delete("/:id", autenticarJWT, TrabalhosController.excluirTrabalho);

router.get('/:id/questoes', TrabalhosController.listarQuestoesPorTrabalho);
router.post('/:id/questoes', autenticarJWT, TrabalhosController.adicionarQuestao);
router.put('/questoes/:id', autenticarJWT, TrabalhosController.atualizarQuestao);
router.delete('/questoes/:id', autenticarJWT, TrabalhosController.excluirQuestao);

router.post('/:id/destino', autenticarJWT, TrabalhosController.definirDestino);

export default router;
