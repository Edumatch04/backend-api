import Publicacao from "../../../models/publicacaoModel.js";
import NaoEncontrado from "../../../erros/NaoEncontrado.js";

class PublicacoesController {
  
  static listarPublicacoes = async (req, res, next) => {
    try {
      const { tipo } = req.query;
      const where = tipo ? { tipo } : {};
  
      const publicacoes = await Publicacao.findAll({ where });
      res.status(200).json(publicacoes);
    } catch (erro) {
      next(erro);
    }
  };

  static listarPublicacaoPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const publicacao = await Publicacao.findByPk(id);

      if (publicacao) {
        res.status(200).json(publicacao);
      } else {
        next(new NaoEncontrado("Publicação não encontrada."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarPublicacao = async (req, res, next) => {
    try {
      const { titulo, conteudo, pdf_url, materia_id, tipo } = req.body;
      const { school_id, id: usuario_id } = req.usuario;

      const novaPublicacao = await Publicacao.create({
        titulo,
        conteudo,
        pdf_url,
        school_id,
        materia_id,
        usuario_id,
        tipo
      });

      res.status(201).json(novaPublicacao);
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarPublicacao = async (req, res, next) => {
    try {
      const id = req.params.id;
      const [updated] = await Publicacao.update(req.body, { where: { id } });

      if (updated) {
        res.status(200).json({ message: "Publicação atualizada com sucesso!" });
      } else {
        next(new NaoEncontrado("Publicação não encontrada."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirPublicacao = async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleted = await Publicacao.destroy({ where: { id } });

      if (deleted) {
        res.status(200).json({ message: "Publicação removida com sucesso!" });
      } else {
        next(new NaoEncontrado("Publicação não encontrada."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default PublicacoesController;
