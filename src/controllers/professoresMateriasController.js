import ProfessorMateria from "../models/professorMateriaModel.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import Professor from "../models/professorModel.js";
import Materia from "../models/materiaModel.js";

class ProfessoresMateriasController {

  static listarProfessoresMaterias = async (req, res, next) => {
    try {
      const professoresMaterias = await ProfessorMateria.findAll({
        include: [
          { model: Professor, attributes: ['id', 'nome'] },  
          { model: Materia, attributes: ['id', 'nome'] }      
        ]
      });
      res.status(200).json(professoresMaterias);
    } catch (erro) {
      next(erro);
    }
  };

  static listarProfessorMateriaPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const professorMateria = await ProfessorMateria.findByPk(id, {
        include: [
          { model: Professor, attributes: ['id', 'nome'] },
          { model: Materia, attributes: ['id', 'nome'] }
        ]
      });

      if (professorMateria) {
        res.status(200).json(professorMateria);
      } else {
        next(new NaoEncontrado("Relação Professor-Matéria não encontrada."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarProfessorMateria = async (req, res, next) => {
    try {
      const { professor_id, materia_id } = req.body;

      const professor = await Professor.findByPk(professor_id);
      const materia = await Materia.findByPk(materia_id);

      if (!professor || !materia) {
        return res.status(400).json({ message: "Professor ou Matéria não encontrados." });
      }

      const professorMateria = await ProfessorMateria.create({ professor_id, materia_id });
      res.status(201).json(professorMateria);
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarProfessorMateria = async (req, res, next) => {
    try {
      const id = req.params.id;
      const { professor_id, materia_id } = req.body;

      const professor = await Professor.findByPk(professor_id);
      const materia = await Materia.findByPk(materia_id);

      if (!professor || !materia) {
        return res.status(400).json({ message: "Professor ou Matéria não encontrados." });
      }

      const [updated] = await ProfessorMateria.update(
        { professor_id, materia_id },
        { where: { id } }
      );

      if (updated) {
        res.status(200).json({ message: "Relação Professor-Matéria atualizada com sucesso!" });
      } else {
        next(new NaoEncontrado("Relação Professor-Matéria não encontrada."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirProfessorMateria = async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleted = await ProfessorMateria.destroy({ where: { id } });

      if (deleted) {
        res.status(200).json({ message: "Relação Professor-Matéria removida com sucesso!" });
      } else {
        next(new NaoEncontrado("Relação Professor-Matéria não encontrada."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default ProfessoresMateriasController;
