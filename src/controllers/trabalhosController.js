import Trabalho from "../models/trabalhoModel.js";
import QuestaoTrabalho from "../models/questaoTrabalhoModel.js";
import AlternativaQuestao from "../models/alternativaQuestaoModel.js";
import TrabalhoTurma from "../models/trabalhoTurmaModel.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class TrabalhosController {

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

    static criarTrabalho = async (req, res, next) => {
        try {
            const { materia_id, professor_id, titulo, descricao, capa } = req.body;

            if (!materia_id || !professor_id || !titulo) {
                return res.status(400).json({ message: "Os campos 'materia_id', 'professor_id' e 'titulo' são obrigatórios." });
            }

            const trabalho = await Trabalho.create({
                materia_id,
                professor_id,
                titulo,
                descricao,
                capa
            });

            res.status(201).json({ message: "Trabalho criado com sucesso!", trabalho_id: trabalho.id });
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

            const questao = await QuestaoTrabalho.create({
                trabalho_id: id,
                pergunta,
                multipla_escolha,
                tempo_segundos,
                valor
            });

            if (multipla_escolha && alternativas) {
                for (const alternativa of alternativas) {
                    await AlternativaQuestao.create({
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

            await TrabalhoTurma.create({
                trabalho_id: id,
                turma_id,
                periodo,
                data_limite
            });

            res.status(201).json({ message: "Trabalho associado à turma com sucesso!" });
        } catch (erro) {
            next(erro);
        }
    };

    static listarTrabalhos = async (req, res, next) => {
        try {
            const trabalhos = await Trabalho.findAll();

            if (trabalhos.length > 0) {
                res.status(200).json(trabalhos);
            } else {
                next(new NaoEncontrado("Nenhum trabalho encontrado."));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static atualizarTrabalho = async (req, res, next) => {
        try {
            const { id } = req.params;
            const [updated] = await Trabalho.update(req.body, { where: { id } });

            if (updated) {
                res.status(200).json({ message: "Trabalho atualizado com sucesso!" });
            } else {
                next(new NaoEncontrado("Trabalho não encontrado."));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static atualizarQuestao = async (req, res, next) => {
        try {
            const { id } = req.params;
            const [updated] = await QuestaoTrabalho.update(req.body, { where: { id } });

            if (updated) {
                res.status(200).json({ message: "Questão atualizada com sucesso!" });
            } else {
                next(new NaoEncontrado("Questão não encontrada."));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static excluirTrabalho = async (req, res, next) => {
        try {
            const { id } = req.params;

            const deleted = await Trabalho.destroy({ where: { id } });

            if (deleted) {
                res.status(200).json({ message: "Trabalho removido com sucesso!" });
            } else {
                next(new NaoEncontrado("Trabalho não encontrado."));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static excluirQuestao = async (req, res, next) => {
        try {
            const { id } = req.params;
    
            // Exclui as alternativas ligadas à questão
            await AlternativaQuestao.destroy({
                where: { questao_id: id }
            });
    
            // Agora exclui a questão
            const deleted = await QuestaoTrabalho.destroy({
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
    
    static listarQuestoesPorTrabalho = async (req, res, next) => {
        try {
            const { id } = req.params;
    
            const questoes = await QuestaoTrabalho.findAll({
                where: { trabalho_id: id },
                include: [
                    {
                        model: AlternativaQuestao,
                        as: 'alternativas'
                    }
                ]
            });
    
            if (questoes.length > 0) {
                res.status(200).json(questoes);
            } else {
                next(new NaoEncontrado("Nenhuma questão encontrada para esse trabalho."));
            }
        } catch (erro) {
            next(erro);
        }
    };
    
}

export default TrabalhosController;
