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

}

export default TempoController;
