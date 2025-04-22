import express from "express";
import escolasRoutes from "./escolaRoutes.js";
import alunosRoutes from "./alunoRoutes.js";
import turmasRoutes from "./turmaRoute.js";
import funcionariosRoutes from "./funcionarioRoute.js";
import professoresRoutes from "./professorRoute.js";
import materiasRoutes from "./materiaRoute.js";
import professorMateriasRoutes from "./professorMateriaRoute.js";
import authRoutes from "./authRoutes.js";
import publicacaoRoutes from "./publicacoesRoutes.js";

const routes = (app) => {
  app.use(express.json());

  app.use("/escolas", escolasRoutes);
  app.use("/alunos", alunosRoutes);
  app.use("/turmas", turmasRoutes);
  app.use("/funcionarios", funcionariosRoutes);
  app.use("/professores", professoresRoutes);
  app.use("/materias", materiasRoutes);
  app.use("/professor-materia", professorMateriasRoutes);
  app.use("/publicacao", publicacaoRoutes);
  app.use(authRoutes);

  app.get("/", (req, res) => {
    res.status(200).send({ mensagem: "API funcionando!" });
  });
};

export default routes