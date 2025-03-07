import Professor from "../models/professorModel.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class ProfessoresController {

  static listarProfessores = async (req, res, next) => {
    try {
      const professores = await Professor.findAll();
      res.status(200).json(professores);
    } catch (erro) {
      next(erro);
    }
  };

  static listarProfessorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const professor = await Professor.findByPk(id);

      if (professor) {
        res.status(200).json(professor);
      } else {
        next(new NaoEncontrado("Professor não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarProfessor = async (req, res, next) => {
    try {
      const { funcionario_id } = req.body;

      const professorExistente = await Professor.findOne({ where: { funcionario_id } });
      if (professorExistente) {
        return res.status(400).json({ message: "Professor já cadastrado." });
      }

      const professor = await Professor.create({ funcionario_id });
      res.status(201).json(professor);
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarProfessor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const [updated] = await Professor.update(req.body, { where: { id } });

      if (updated) {
        res.status(200).json({ message: "Professor atualizado com sucesso!" });
      } else {
        next(new NaoEncontrado("Professor não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirProfessor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleted = await Professor.destroy({ where: { id } });

      if (deleted) {
        res.status(200).json({ message: "Professor removido com sucesso!" });
      } else {
        next(new NaoEncontrado("Professor não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default ProfessoresController;
