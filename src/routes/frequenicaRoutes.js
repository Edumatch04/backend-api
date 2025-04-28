import express from "express";
import { buscarOfensivaConsecutiva, buscarTopOfensivas } from "../services/frequenciaService.js";

const router = express.Router();

router.get("/ofensiva", async (req, res, next) => {
  try {
    const { id: aluno_id } = req.usuario;

    const diasDeOfensiva = await buscarOfensivaConsecutiva(aluno_id);

    res.status(200).json({ diasDeOfensiva });
  } catch (erro) {
    next(erro);
  }
});

router.get("/frequencia/rank", async (req, res, next) => {
  try {
    const rank = await buscarTopOfensivas();

    res.status(200).json(rank);
  } catch (erro) {
    next(erro);
  }
});

export default router;
