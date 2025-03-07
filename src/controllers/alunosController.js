import Aluno from "../models/alunoModel.js";
import NaoEncontrado from "../erros/NaoEncontrado.js"; 
import { Op } from 'sequelize';

class AlunosController {

  static listarAlunos = async (req, res, next) => {
    try {
      const alunosResultados = await Aluno.findAll();
      res.status(200).json(alunosResultados);
    } catch (erro) {
      next(erro);
    }
  };

  static listarAlunosPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const alunoResultado = await Aluno.findByPk(id); 

      if (alunoResultado) {
        res.status(200).json(alunoResultado);
      } else {
        next(new NaoEncontrado("Aluno não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarAluno = async (req, res, next) => {
    try {
      const { nome, ra, tipo, idade, nome_usuario, turma, periodo, genero, email, senha } = req.body;
      
      const alunoExistente = await Aluno.findOne({
        where: {
          [Op.or]: [{ ra }, { nome_usuario }] 
        }
      });

      if (alunoExistente) {
        return res.status(400).json({ message: "RA ou nome de usuário já cadastrado." });
      }

      const aluno = await Aluno.create({ nome, ra, tipo, idade, nome_usuario, turma, periodo, genero, email, senha });
      res.status(201).json(aluno);
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAluno = async (req, res, next) => {
    try {
      const id = req.params.id;
      const [updated] = await Aluno.update(req.body, { where: { id } });

      if (updated) {
        res.status(200).json({ message: "Aluno atualizado com sucesso!" });
      } else {
        next(new NaoEncontrado("Aluno não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirAluno = async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleted = await Aluno.destroy({ where: { id } });

      if (deleted) {
        res.status(200).json({ message: "Aluno removido com sucesso!" });
      } else {
        next(new NaoEncontrado("Aluno não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default AlunosController;
