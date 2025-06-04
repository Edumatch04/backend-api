import express from 'express';
import TrabalhosController from '../controllers/trabalhosController.js';
import autenticarJWT from "../middleware/authMiddleware.js";
import autenticarProfessor from "../middleware/autenticarProfessor.js"; 

const router = express.Router();

router.post('/materia', autenticarJWT, TrabalhosController.selecionarMateria);
router.post('/criar', autenticarJWT, TrabalhosController.criarTrabalho);
router.get("/", TrabalhosController.listarTrabalhos);
router.put("/:id", autenticarJWT, TrabalhosController.atualizarTrabalho);
router.delete("/:id", autenticarJWT, TrabalhosController.excluirTrabalho);

router.get('/:id/questoes', autenticarJWT, TrabalhosController.listarQuestoesPorTrabalho);
router.post('/:id/questoes', autenticarJWT, TrabalhosController.adicionarQuestao);
router.put('/questoes/:id', autenticarJWT, TrabalhosController.atualizarQuestao);
router.delete('/questoes/:id', autenticarJWT, TrabalhosController.excluirQuestao);

router.post('/:id/destino', autenticarJWT, TrabalhosController.definirDestino);

export default router;
