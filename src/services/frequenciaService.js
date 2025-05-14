import Aluno from "../models/alunoModel.js";
import { Op } from "sequelize";
const hoje = new Date();
const ontem = new Date();
ontem.setDate(hoje.getDate() - 1);
import Resposta from "../models/respostaModels.js";
import Frequencia from "../models/frequenciaModel.js";

// Função que será chamada quando o aluno responder a atividade
export const responderAtividade = async (req, res) => {
    const { aluno_id, atividade_id, resposta } = req.body;

    try {
        // Registra a resposta na tabela 'resposta'
        await Resposta.create({
            aluno_id,
            atividade_id,
            resposta,
            data_resposta: new Date() // Marca a data da resposta
        });

        // Agora, registra a atividade (só se houver resposta)
        await registrarAtividade(aluno_id);

        res.status(200).json({ mensagem: "Resposta registrada e atividade atualizada!" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao registrar resposta", error });
    }
};

export async function registrarAtividade(aluno_id, publicacao_id, tipo_publicacao) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // zera a hora pra comparar só o dia

    const frequenciaExistente = await Frequencia.findOne({
        where: {
            aluno_id,
            data_hora: {
                [Op.gte]: hoje, // Só pega entregas de hoje
            },
        },
    });

    if (!frequenciaExistente) {
        // Primeira entrega do dia
        await Frequencia.create({
            aluno_id,
            publicacao_id,
            tipo_publicacao,
            data_hora: new Date(),
            ofensiva: 1,
        });
    } else {
        // Já entregou hoje -> só cria novo registro mas sem resetar ofensiva
        await Frequencia.create({
            aluno_id,
            publicacao_id,
            tipo_publicacao,
            data_hora: new Date(),
            ofensiva: frequenciaExistente.ofensiva + 1,
        });
    }
}

// Função para buscar a quantidade de dias consecutivos com atividade (frequência) 
export const buscarOfensivaConsecutiva = async (aluno_id) => {
    const frequencias = await Frequencia.findAll({
        where: { aluno_id },
        order: [["ultimo_dia", "DESC"]], // Ordena pela data mais recente
    });

    if (!frequencias.length) return 0;

    let diasConsecutivos = 0;
    let dataEsperada = new Date();

    for (const freq of frequencias) {
        const dataFreq = new Date(freq.data);

        if (
            dataFreq.toISOString().slice(0, 10) === dataEsperada.toISOString().slice(0, 10)
            || dataFreq.toISOString().slice(0, 10) === new Date(dataEsperada.setDate(dataEsperada.getDate() - 1)).toISOString().slice(0, 10)
        ) {
            diasConsecutivos++;
        } else {
            break;
        }
    }

    return diasConsecutivos;
};

// Função para buscar os top 5 alunos com maior ofensiva consecutiva
export const buscarTopOfensivas = async () => {
    const alunos = await Aluno.findAll(); // Busca todos os alunos
    const ofensivas = [];

    for (const aluno of alunos) {
        const dias = await buscarOfensivaConsecutiva(aluno.id);
        ofensivas.push({ nome: aluno.nome, dias });
    }

    // Ordena os alunos pela quantidade de dias consecutivos (em ordem decrescente)
    ofensivas.sort((a, b) => b.dias - a.dias);

    // Retorna os top 5 alunos
    return ofensivas.slice(0, 5);
};