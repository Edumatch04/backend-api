import Escola from "../models/escolaModel.js";
import NaoEncontrado from "../erros/NaoEncontrado.js"; // Caso tenha um erro personalizado

class EscolasController {
  
  // Listar todas as escolas
  static listarEscolas = async (req, res, next) => {
    try {
      const escolasResultados = await Escola.findAll(); // Corrigido para Sequelize
      res.status(200).json(escolasResultados);
    } catch (erro) {
      next(erro);
    }
  };

  // Listar escola por ID
  static listarEscolasPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const escolaResultado = await Escola.findByPk(id); // Sequelize usa findByPk para buscar por ID

      if (escolaResultado) {
        res.status(200).json(escolaResultado);
      } else {
        next(new NaoEncontrado("Id da Escola não localizada"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  // Cadastrar nova escola
  static cadastrarEscola = async (req, res, next) => {
    try {
      const escola = await Escola.create(req.body); // Usamos create() no Sequelize
      res.status(201).json(escola);
    } catch (erro) {
      next(erro);
    }
  };

  // Atualizar escola
  static atualizarEscola = async (req, res, next) => {
    try {
      const id = req.params.id;
      const [updated] = await Escola.update(req.body, { where: { id } });

      if (updated) {
        res.status(200).json({ message: "Escola atualizada com sucesso!" });
      } else {
        next(new NaoEncontrado("Id da Escola não localizada."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  // Excluir escola
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


// export const getEscolas = async (req, res) => {
//   try {
//     const escolas = await Escola.getAll();
//     res.status(200).json(escolas);
//   } catch (error) {
//     res.status(500).json({ message: 'Erro ao buscar escolas', error: error.message });
//   }
// };

// export const getEscolaById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const escola = await Escola.getById(id);
//     if (!escola) {
//       return res.status(404).json({ message: 'Escola não encontrada' });
//     }
//     res.status(200).json(escola);
//   } catch (error) {
//     res.status(500).json({ message: 'Erro ao buscar a escola', error: error.message });
//   }
// };

// export const createEscola = async (req, res) => {
//   const { nome, cnpj, tipo, endereco, cidade, estado, cep, telefone } = req.body;

//   if (!nome || !cnpj || !tipo || !endereco || !cidade || !estado || !cep || !telefone) {
//     return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
//   }

//   try {
//     const newEscola = { nome, cnpj, tipo, endereco, cidade, estado, cep, telefone };
//     const result = await Escola.create(newEscola);
//     res.status(201).json({ message: 'Escola criada com sucesso', escolaId: result.insertId });
//   } catch (error) {
//     res.status(500).json({ message: 'Erro ao criar a escola', error: error.message });
//   }
// };

// export const updateEscola = async (req, res) => {
//   const { id } = req.params;
//   const { nome, cnpj, tipo, endereco, cidade, estado, cep, telefone } = req.body;

//   if (!nome || !cnpj || !tipo || !endereco || !cidade || !estado || !cep || !telefone) {
//     return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
//   }

//   try {
//     const updatedEscola = { nome, cnpj, tipo, endereco, cidade, estado, cep, telefone };
//     const result = await Escola.update(id, updatedEscola);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Escola não encontrada' });
//     }
//     res.status(200).json({ message: 'Escola atualizada com sucesso' });
//   } catch (error) {
//     res.status(500).json({ message: 'Erro ao atualizar a escola', error: error.message });
//   }
// };

// export const deleteEscola = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await Escola.delete(id);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Escola não encontrada' });
//     }
//     res.status(200).json({ message: 'Escola deletada com sucesso' });
//   } catch (error) {
//     res.status(500).json({ message: 'Erro ao deletar a escola', error: error.message });
//   }
// };
