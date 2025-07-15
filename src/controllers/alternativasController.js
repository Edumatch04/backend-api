import AlternativaQuestao from "../models/alternativaQuestaoModel.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class AlternativasController {

  static listarAlternativasPorQuestao = async (req, res, next) => {
    try {
      const { questao_id } = req.params;
      const alternativas = await AlternativaQuestao.findAll({ where: { questao_id } });

      if (alternativas.length > 0) {
        res.status(200).json(alternativas);
      } else {
        next(new NaoEncontrado("Nenhuma alternativa encontrada para esta questão."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static adicionarAlternativa = async (req, res, next) => {
    try {
      const { questao_id } = req.params;
      const { texto, correta } = req.body;

      if (!texto) {
        return res.status(400).json({ message: "O campo 'texto' é obrigatório." });
      }

      const alternativa = await AlternativaQuestao.create({ questao_id, texto, correta });
      res.status(201).json({ message: "Alternativa adicionada com sucesso!", alternativa });
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAlternativa = async (req, res, next) => {
    try {
      const { id } = req.params;
      const [updated] = await AlternativaQuestao.update(req.body, { where: { id } });

      if (updated) {
        res.status(200).json({ message: "Alternativa atualizada com sucesso!" });
      } else {
        next(new NaoEncontrado("Alternativa não encontrada."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirAlternativa = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await AlternativaQuestao.destroy({ where: { id } });

      if (deleted) {
        res.status(200).json({ message: "Alternativa removida com sucesso!" });
      } else {
        next(new NaoEncontrado("Alternativa não encontrada."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAlternativa = async (req, res, next) => {
    try {
      const { id } = req.params;
      const [updated] = await AlternativaQuestao.update(req.body, { where: { id } });

      if (updated) {
        res.status(200).json({ message: "Alternativa atualizada com sucesso!" });
      } else {
        next(new NaoEncontrado("Alternativa não encontrada."));
      }
    } catch (erro) {
      next(erro);
    }
  };

}

export default AlternativasController;
