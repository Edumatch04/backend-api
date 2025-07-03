import express from 'express';
import PublicacoesController from '../components/escolas/controller/publicacoesController.js';
import autenticarJWT from "../middleware/authMiddleware.js";
import validarCamposPublicacao from '../middleware/validacaoPublicacoMiddleware.js';

const router = express.Router();

router.get('/', autenticarJWT, PublicacoesController.listarPublicacoes);
router.get('/:id', autenticarJWT, PublicacoesController.listarPublicacaoPorId);
router.post('/', autenticarJWT, validarCamposPublicacao, PublicacoesController.cadastrarPublicacao);
router.put('/:id', autenticarJWT, PublicacoesController.atualizarPublicacao);
router.delete('/:id', autenticarJWT, PublicacoesController.excluirPublicacao);

export default router;
