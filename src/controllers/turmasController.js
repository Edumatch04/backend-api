import Turma from "../models/turmaModel.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class TurmasController {

  static listarTurmas = async (req, res, next) => {
    try {
      const school_id = req.usuario.school_id;
      const turmas = await Turma.findAll({
        where: { school_id }
      });

      res.status(200).json(turmas);
    } catch (erro) {
      next(erro);
    }
  };

  static listarTurmaPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const turma = await Turma.findByPk(id);

      if (turma) {
        res.status(200).json(turma);
      } else {
        next(new NaoEncontrado("Turma não encontrada."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarTurma = async (req, res, next) => {
    try {
      const school_id = req.usuario.school_id;
      const { nome, descricao, periodo } = req.body;

      const turma = await Turma.create({
        nome,
        descricao,
        periodo,
        school_id
      });

      res.status(201).json(turma);
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarTurma = async (req, res, next) => {
    try {
      const id = req.params.id;
      const [updated] = await Turma.update(req.body, { where: { id } });

      if (updated) {
        res.status(200).json({ message: "Turma atualizada com sucesso!" });
      } else {
        next(new NaoEncontrado("Turma não encontrada."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirTurma = async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleted = await Turma.destroy({ where: { id } });

      if (deleted) {
        res.status(200).json({ message: "Turma removida com sucesso!" });
      } else {
        next(new NaoEncontrado("Turma não encontrada."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default TurmasController;
