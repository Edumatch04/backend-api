import Funcionario from "../models/funcionarioModel.js";
import NaoEncontrado from "../erros/NaoEncontrado.js"; 
import { Op } from 'sequelize';

class FuncionariosController {

  static listarFuncionarios = async (req, res, next) => {
    try {
      const funcionariosResultados = await Funcionario.findAll();
      res.status(200).json(funcionariosResultados);
    } catch (erro) {
      next(erro);
    }
  };

  static listarFuncionariosPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const funcionarioResultado = await Funcionario.findByPk(id); 

      if (funcionarioResultado) {
        res.status(200).json(funcionarioResultado);
      } else {
        next(new NaoEncontrado("Funcionario não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarFuncionario = async (req, res, next) => {
    try {
        const { nome, nome_usuario, cargo, email, senha, telefone, data_contratacao } = req.body;

        const funcionarioExistente = await Funcionario.findOne({
            where: {
                [Op.or]: [{ email }, { nome_usuario }]
            }
        });

        if (funcionarioExistente) {
            return res.status(400).json({ message: "Email ou nome de usuário já cadastrados." });
        }

        const funcionario = await Funcionario.create({ nome, nome_usuario, cargo, email, senha, telefone, data_contratacao });

        if (cargo === 'Professor') {
            await Funcionario.sequelize.query(`
                INSERT INTO professores (funcionario_id) VALUES (${funcionario.id})
            `);
        }

        res.status(201).json(funcionario);
    } catch (erro) {
        next(erro);
    }
  };


  static atualizarFuncionario = async (req, res, next) => {
    try {
      const id = req.params.id;
      const [updated] = await Funcionario.update(req.body, { where: { id } });

      if (updated) {
        res.status(200).json({ message: "Funcionario atualizado com sucesso!" });
      } else {
        next(new NaoEncontrado("Funcionario não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirFuncionario = async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleted = await Funcionario.destroy({ where: { id } });

      if (deleted) {
        res.status(200).json({ message: "Funcionario removido com sucesso!" });
      } else {
        next(new NaoEncontrado("Funcionario não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default FuncionariosController;
