import Resposta from "../models/respostaModels.js";
import Publicacao from "../models/publicacaoModel.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import ErroUsuario from "../erros/ErroUsuario.js";
import { registrarAtividade } from "../services/frequenciaService.js";

class RespostaController {

    static cadastrarResposta = async (req, res, next) => {
        try {
            const { publicacao_id, pdf_url } = req.body;
            const { id: aluno_id } = req.usuario;

            const publicacao = await Publicacao.findByPk(publicacao_id);
            if (!publicacao) {
                return next(new NaoEncontrado("Publicação não encontrada."));
            }

            if (publicacao.tipo === "Aviso") {
                return next(new ErroUsuario("Não é permitido enviar resposta para Avisos."));
            }            

            const novaResposta = await Resposta.create({
                publicacao_id,
                aluno_id,
                pdf_url,
                tipo_publicacao: publicacao.tipo,
            });

            if (["Desafio", "Trabalho", "Reforço"].includes(publicacao.tipo)) {
                await registrarAtividade(aluno_id); 
            }

            res.status(201).json(novaResposta);
        } catch (erro) {
            console.error(erro);
            next(erro);
        }
    };


    static listarRespostasPorPublicacao = async (req, res, next) => {
        try {
            const publicacao_id = req.params.publicacao_id;

            const respostas = await Resposta.findAll({
                where: { publicacao_id },
            });

            if (!respostas.length) {
                return res.status(404).json({ message: "Nenhuma resposta encontrada para essa publicação." });
            }

            res.status(200).json(respostas);
        } catch (erro) {
            next(erro);
        }
    };

}

export default RespostaController;
