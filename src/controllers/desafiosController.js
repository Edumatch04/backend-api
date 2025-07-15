import Desafio from "../models/desafioModel.js";
import QuestaoDesafio from "../models/questaoDesafioModel.js";
import AlternativaQuestaoDesafio from "../models/alternativaQuestaoDesafioModel.js";
import DesafioTurma from "../models/desafioTurmaModel.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class DesafiosController {

    static selecionarMateria = async (req, res, next) => {
        try {
            const { materia_id } = req.body;

            if (!materia_id) {
                return res.status(400).json({ message: "O campo 'materia_id' é obrigatório." });
            }

            res.status(200).json({ message: "Matéria selecionada com sucesso!", materia_id });
        } catch (erro) {
            next(erro);
        }
    };

    static criarDesafio = async (req, res, next) => {
        try {
            const { materia_id, professor_id, titulo, descricao, capa } = req.body;

            if (!materia_id || !professor_id || !titulo) {
                return res.status(400).json({ message: "Os campos 'materia_id', 'professor_id' e 'titulo' são obrigatórios." });
            }

            const desafio = await Desafio.create({
                materia_id,
                professor_id,
                titulo,
                descricao,
                capa
            });

            res.status(201).json({ message: "Desafio criado com sucesso!", desafio_id: desafio.id });
        } catch (erro) {
            next(erro);
        }
    };

    static adicionarQuestao = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { pergunta, multipla_escolha, tempo_segundos, valor, alternativas } = req.body;

            if (!pergunta || typeof multipla_escolha !== "boolean") {
                return res.status(400).json({ message: "Os campos 'pergunta' e 'multipla_escolha' são obrigatórios." });
            }

            const questao = await QuestaoDesafio.create({
                desafio_id: id,
                pergunta,
                multipla_escolha,
                tempo_segundos,
                valor
            });

            if (multipla_escolha && alternativas) {
                for (const alternativa of alternativas) {
                    await AlternativaQuestaoDesafio.create({
                        questao_id: questao.id,
                        texto: alternativa.texto,
                        correta: alternativa.correta
                    });
                }
            }

            res.status(201).json({ message: "Questão adicionada com sucesso!", questao_id: questao.id });
        } catch (erro) {
            next(erro);
        }
    };

    static definirDestino = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { turma_id, periodo, data_limite } = req.body;

            if (!turma_id || !periodo || !data_limite) {
                return res.status(400).json({ message: "Os campos 'turma_id', 'periodo' e 'data_limite' são obrigatórios." });
            }

            await DesafioTurma.create({
                desafio_id: id,
                turma_id,
                periodo,
                data_limite
            });

            res.status(201).json({ message: "Desafio associado à turma com sucesso!" });
        } catch (erro) {
            next(erro);
        }
    };

    static listarDesafios = async (req, res, next) => {
        try {
            const desafios = await Desafio.findAll();

            if (desafios.length > 0) {
                res.status(200).json(desafios);
            } else {
                next(new NaoEncontrado("Nenhum desafio encontrado."));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static atualizarDesafio = async (req, res, next) => {
        try {
            const { id } = req.params;
            const [updated] = await Desafio.update(req.body, { where: { id } });

            if (updated) {
                res.status(200).json({ message: "Desafio atualizado com sucesso!" });
            } else {
                next(new NaoEncontrado("Desafio não encontrado."));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static atualizarQuestao = async (req, res, next) => {
        try {
            const { id } = req.params;
            const [updated] = await QuestaoDesafio.update(req.body, { where: { id } });

            if (updated) {
                res.status(200).json({ message: "Questão atualizada com sucesso!" });
            } else {
                next(new NaoEncontrado("Questão não encontrada."));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static excluirDesafio = async (req, res, next) => {
        try {
            const { id } = req.params;

            const deleted = await Desafio.destroy({ where: { id } });

            if (deleted) {
                res.status(200).json({ message: "Desafio removido com sucesso!" });
            } else {
                next(new NaoEncontrado("Desafio não encontrado."));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static excluirQuestao = async (req, res, next) => {
        try {
            const { id } = req.params;
    
            await AlternativaQuestao.destroy({
                where: { questao_id: id }
            });
    
            const deleted = await QuestaoDesafio.destroy({
                where: { id }
            });
    
            if (deleted) {
                res.status(200).json({ message: "Questão (e alternativas) removida com sucesso!" });
            } else {
                next(new NaoEncontrado("Questão não encontrada."));
            }
        } catch (erro) {
            next(erro);
        }
    };
    
    static listarQuestoesPorDesafio = async (req, res, next) => {
        try {
            const { id } = req.params;
    
            const questoes = await QuestaoDesafio.findAll({
                where: { desafio_id: id },
                include: [
                    {
                        model: AlternativaQuestaoDesafio,
                        as: 'alternativas'
                    }
                ]
            });
    
            if (questoes.length > 0) {
                res.status(200).json(questoes);
            } else {
                next(new NaoEncontrado("Nenhuma questão encontrada para esse desafio."));
            }
        } catch (erro) {
            next(erro);
        }
    };
    
}

export default DesafiosController;
