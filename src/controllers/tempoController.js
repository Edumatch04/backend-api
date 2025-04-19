import Aluno from "../models/alunoModel.js";
import Acesso from "../models/tempoModel.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import { Op } from 'sequelize';

class TempoController {

    static registrarTempo = async (req, res) => {
        try {
            const { aluno_id, total_time } = req.body;

            if (!aluno_id || typeof total_time !== 'number') {
                return res.status(400).json({ message: 'Parâmetros inválidos.' });
            }

            const aluno = await Aluno.findByPk(aluno_id);
            if (!aluno) {
                return res.status(404).json({ message: 'Aluno não encontrado.' });
            }

            const hoje = new Date().toISOString().split('T')[0];

            const acessoExistente = await Acesso.findOne({
                where: {
                    aluno_id: aluno_id,
                    data: hoje,
                }
            });

            if (acessoExistente) {
                acessoExistente.tempo_total += total_time;
                await acessoExistente.save();
            } else {
                await Acesso.create({
                    aluno_id: aluno_id,
                    data: hoje,
                    tempo_total: total_time,
                });
            }

            const acessos = await Acesso.findAll({
                where: { aluno_id: aluno_id },
            });

            const tempoTotal = acessos.reduce((acc, acesso) => acc + acesso.tempo_total, 0);

            aluno.tempo_total = tempoTotal;
            await aluno.save();

            res.status(200).json({ message: 'Tempo registrado com sucesso!' });
        } catch (erro) {
            res.status(500).json({ message: 'Erro ao registrar tempo.', error: erro.message });
        }
    };

    static obterTempoPorIntervalo = async (req, res) => {
        try {
            const { id: aluno_id } = req.params;
            const { dias } = req.query;

            if (!dias || isNaN(dias) || dias <= 0) {
                return res.status(400).json({ message: 'Informe um número válido de dias.' });
            }

            const aluno = await Aluno.findByPk(aluno_id);
            if (!aluno) {
                return res.status(404).json({ message: 'Aluno não encontrado.' });
            }

            const dataInicial = new Date();
            dataInicial.setDate(dataInicial.getDate() - dias);

            const acessos = await Acesso.findAll({
                where: {
                    aluno_id: aluno_id,
                    data: {
                        [Op.gte]: dataInicial.toISOString().split('T')[0],
                    }
                },
                order: [['data', 'ASC']]
            });

            if (acessos.length === 0) {
                return res.status(404).json({ message: `Nenhum acesso registrado nos últimos ${dias} dias.` });
            }

            const tempoTotal = acessos.reduce((acc, acesso) => acc + acesso.tempo_total, 0);
            const mediaTempo = tempoTotal / acessos.length;

            res.status(200).json({
                acessos,
                tempoTotal,
                mediaTempo,
                quantidadeDias: acessos.length,
            });

        } catch (erro) {
            res.status(500).json({ message: 'Erro ao obter dados.', error: erro.message });
        }
    };
}

export default TempoController;
