import express from 'express';
import DesafioController from '../components/escolas/controller/desafiosController.js';
import autenticarJWT from "../middleware/authMiddleware.js";
import autenticarProfessor from "../middleware/autenticarProfessor.js"; 

const router = express.Router();

router.post('/materia', autenticarJWT, DesafioController.selecionarMateria);
router.post('/criar', autenticarJWT, DesafioController.criarDesafio);
router.get("/", DesafioController.listarDesafios);
router.put("/:id", autenticarJWT, DesafioController.atualizarDesafio);
router.delete("/:id", autenticarJWT, DesafioController.excluirDesafio);

router.get('/:id/questoes', autenticarJWT, DesafioController.listarQuestoesPorDesafio);
router.post('/:id/questoes', autenticarJWT, DesafioController.adicionarQuestao);
router.put('/questoes/:id', autenticarJWT, DesafioController.atualizarQuestao);
router.delete('/questoes/:id', autenticarJWT, DesafioController.excluirQuestao);

router.post('/:id/destino', autenticarJWT, DesafioController.definirDestino);

export default router;
