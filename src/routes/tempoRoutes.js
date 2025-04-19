import express from 'express';
import TempoController from '../controllers/tempoController.js';

const router = express.Router();

router.post('/saveTime', TempoController.registrarTempo);

export default router;
