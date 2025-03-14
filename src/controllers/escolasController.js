import Escola from "../models/escolaModel.js";
import NaoEncontrado from "../erros/NaoEncontrado.js"; 
import bcrypt from "bcryptjs";

class EscolasController {
  
  static listarEscolas = async (req, res, next) => {
    try {
      const escolasResultados = await Escola.findAll(); 
      res.status(200).json(escolasResultados);
    } catch (erro) {
      next(erro);
    }
  };

  static listarEscolasPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const escolaResultado = await Escola.findByPk(id); 

      if (escolaResultado) {
        res.status(200).json(escolaResultado);
      } else {
        next(new NaoEncontrado("Id da Escola não localizada"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarEscola = async (req, res, next) => {
    try {
        const { nome, cnpj, endereco, cep, cidade, estado, email_admin, dominio, senha, tipo, status, nivel_ensino } = req.body;
        
        if (!senha) {
          return res.status(400).json({ message: "A senha é obrigatória." });
        }

        const escolaExistente = await Escola.findOne({ where: { cnpj } });
        if (escolaExistente) {
            return res.status(400).json({ message: "CNPJ já cadastrado." });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const escola = await Escola.create({ 
            nome, cnpj, endereco, cep, cidade, estado, email_admin, dominio, senha: senhaHash, tipo, status, nivel_ensino
        });

        res.status(201).json(escola);
    } catch (erro) {
        next(erro);
    }
  };


  static atualizarEscola = async (req, res, next) => {
    try {
        const id = req.params.id;
        const [updated] = await Escola.update(
            { ...req.body, data_atualizacao: new Date() }, 
            { where: { id } }
        );

        if (updated) {
            res.status(200).json({ message: "Escola atualizada com sucesso!" });
        } else {
            next(new NaoEncontrado("Id da Escola não localizada."));
        }
    } catch (erro) {
        next(erro);
    }
  };

  static excluirEscola = async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleted = await Escola.destroy({ where: { id } });

      if (deleted) {
        res.status(200).json({ message: "Escola removida com sucesso!" });
      } else {
        next(new NaoEncontrado("Id da Escola não localizada."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default EscolasController;