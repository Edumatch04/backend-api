import Materia from "../models/materiaModel.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import { ValidationError } from "sequelize"; 

class MateriasController {
  static listarMaterias = async (req, res, next) => {
    try {
      const materias = await Materia.findAll();
      res.status(200).json(materias);
    } catch (erro) {
      next(erro);
    }
  };

  static listarMateriaPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const materia = await Materia.findByPk(id);
      if (materia) {
        res.status(200).json(materia);
      } else {
        next(new NaoEncontrado("Matéria não encontrada."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarMateria = async (req, res, next) => {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ message: "Nome da matéria é obrigatório." });
      }

      const materia = await Materia.create(req.body);
      res.status(201).json(materia);
    } catch (erro) {
      if (erro instanceof ValidationError) {
        return res.status(400).json({ message: "Erro de validação", details: erro.errors });
      }
      next(erro);
    }
  };

  static atualizarMateria = async (req, res, next) => {
    try {
      const id = req.params.id;
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ message: "Nome da matéria é obrigatório." });
      }

      const [updated] = await Materia.update(req.body, { where: { id } });

      if (updated) {
        res.status(200).json({ message: "Matéria atualizada com sucesso!" });
      } else {
        next(new NaoEncontrado("Matéria não encontrada."));
      }
    } catch (erro) {
      if (erro instanceof ValidationError) {
        return res.status(400).json({ message: "Erro de validação", details: erro.errors });
      }
      next(erro);
    }
  };

  static excluirMateria = async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleted = await Materia.destroy({ where: { id } });

      if (deleted) {
        res.status(200).json({ message: "Matéria removida com sucesso!" });
      } else {
        next(new NaoEncontrado("Matéria não encontrada."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default MateriasController;
