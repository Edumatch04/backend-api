import Funcionario from "../../../models/funcionarioModel.js";
import User from "../models/userModel.js"; 
import NaoEncontrado from "../../../erros/NaoEncontrado.js"; 
import { Op } from 'sequelize';
import bcrypt from "bcryptjs";

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
  
      const school_id = req.usuario.school_id;  
  
      if (!school_id) {
        return res.status(403).json({ message: "Usuário sem permissão para cadastrar funcionário." });
      }

      const funcionarioExistente = await Funcionario.findOne({
        where: {
          [Op.or]: [{ email }, { nome_usuario }]
        }
      });
  
      if (funcionarioExistente) {
        return res.status(400).json({ message: "Email ou nome de usuário já cadastrados." });
      }
  
      const senhaHash = await bcrypt.hash(senha, 10);
  
      const funcionario = await Funcionario.create({
        nome,
        nome_usuario,
        cargo,
        email,
        senha: senhaHash,  
        telefone,
        data_contratacao,
        school_id  
      });

      await User.create({
        email,
        nome,
        password_hash: senhaHash,
        school_id,
        role: cargo === 'Professor' ? 'Professor' : 
              cargo === 'Diretor' ? 'Diretor' : 
              cargo === 'Vice Diretor' ? 'Vice Diretor' : 
              cargo === 'Coordenador' ? 'Coordenador' : 
              cargo === 'Secretário' ? 'Secretário' : 
              cargo === 'Financeiro' ? 'Financeiro' : 'Professor'  
      });
          
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
