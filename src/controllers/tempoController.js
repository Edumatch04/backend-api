import Acesso from '../models/acessoModel.js';
import Aluno from '../models/alunoModel.js';
import { Op } from 'sequelize';

const registrarTempo = async (req, res) => {
  try {
    const { user_id, total_time } = req.body;

    if (!user_id || !total_time) {
      return res.status(400).json({ message: 'Parâmetros inválidos.' });
    }

    const aluno = await Aluno.findByPk(user_id);
    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado.' });
    }

    const hoje = new Date().toISOString().split('T')[0]; 

    const acessoExistente = await Acesso.findOne({
      where: {
        aluno_id: user_id,
        data: hoje
      }
    });

    if (acessoExistente) {
      acessoExistente.tempo_total += total_time;
      await acessoExistente.save();
    } else {
      await Acesso.create({
        aluno_id: user_id,
        data: hoje,
        tempo_total: total_time
      });
    }

    res.status(200).json({ message: 'Tempo registrado com sucesso!' });
  } catch (erro) {
    res.status(500).json({ message: 'Erro ao registrar tempo.', error: erro.message });
  }
};

export default {
  registrarTempo
};
