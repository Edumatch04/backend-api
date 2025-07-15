import Aluno from "../models/alunoModel.js";
import User from "../models/userModel.js"; 
import Acesso from "../../../models/tempoModel.js";
import NaoEncontrado from "../../../erros/NaoEncontrado.js"; 
import { Op } from 'sequelize';
import bcrypt from "bcryptjs";

class AlunosController {

  static registrarTempo = async (req, res) => {
    try {
      const { user_id, total_time } = req.body;
  
      if (!user_id || typeof total_time !== 'number') {
        return res.status(400).json({ message: 'Parâmetros inválidos.' });
      }      
  
      const aluno = await Aluno.findByPk(user_id);
      if (!aluno) {
        return res.status(404).json({ message: 'Aluno não encontrado.' });
      }
  
      const hoje = new Date().toISOString().split('T')[0];
  
      const acessoExistente = await Acesso.findOne({
        where: {
          aluno_id: user_id,
          data: hoje
        }
      });
  
      if (acessoExistente) {
        acessoExistente.tempo_total += total_time;
        await acessoExistente.save();
      } else {
        await Acesso.create({
          aluno_id: user_id,
          data: hoje,
          tempo_total: total_time
        });
      }
  
      aluno.tempo_total += total_time;
      await aluno.save();
  
      res.status(200).json({ message: 'Tempo registrado com sucesso!' });
    } catch (erro) {
      res.status(500).json({ message: 'Erro ao registrar tempo.', error: erro.message });
    }
  };  

  static listarAlunos = async (req, res, next) => {
    try {
      const alunosResultados = await Aluno.findAll({
        include: {
          model: Turma,
          as: 'turma', 
          attributes: ['id', 'nome', 'periodo'] 
        }
      });
      res.status(200).json(alunosResultados);
    } catch (erro) {
      next(erro);
    }
  };

  static listarAlunosPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const alunoResultado = await Aluno.findByPk(id, {
        include: {
          model: Turma,
          as: 'turma',
          attributes: ['id', 'nome', 'periodo']
        }
      });

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
        const { nome, ra, tipo, idade, nome_usuario, turma_id, genero, email, senha } = req.body;

        const school_id = req.usuario.school_id;  

        if (!school_id) {
            return res.status(403).json({ message: "Usuário sem permissão para cadastrar aluno." });
        }

        const alunoExistente = await Aluno.findOne({
            where: {
                [Op.or]: [{ ra }, { nome_usuario }]
            }
        });

        if (alunoExistente) {
            return res.status(400).json({ message: "RA ou nome de usuário já cadastrado." });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const aluno = await Aluno.create({
            nome,
            ra,
            tipo,
            idade,
            nome_usuario,
            turma_id, 
            genero,
            email,
            senha: senhaHash,
            school_id 
        });

        await User.create({
            email,
            nome,
            password_hash: senhaHash,
            school_id,
            role: tipo === 'Tutor' ? 'Aluno' : 'Aluno',
        });

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
