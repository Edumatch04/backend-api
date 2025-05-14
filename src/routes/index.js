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
import respostaRoutes from "./respostaRoute.js";
import frequencias from "./frequenicaRoutes.js";
import trabalhosRoutes from "./trabalhoRoutes.js";
import desafiosRoutes from "./desafioRoute.js";
import alternativasRoutes from "./alternativaRoute.js";
import alternativasDesafiosRoutes from "./alternativaDesafioRoute.js";

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
  app.use("/respostas", respostaRoutes);
  app.use("/frequencia", frequencias);
  app.use("/trabalhos", trabalhosRoutes);
  app.use("/desafios", desafiosRoutes);
  app.use("/alternativas", alternativasRoutes);
  app.use("/alternativas-desafios", alternativasDesafiosRoutes);
  app.use(authRoutes);

  app.get("/", (req, res) => {
    res.status(200).send({ mensagem: "API funcionando!" });
  });
};

export default routes