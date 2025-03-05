import { ValidationError, UniqueConstraintError, DatabaseError } from "sequelize";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

function manipuladorDeErros(erro, req, res, next) {
  if (erro instanceof ValidationError) {
    // Erro de validação do Sequelize (similar ao Mongoose ValidationError)
    new ErroValidacao(erro).enviarResposta(res);
  } else if (erro instanceof UniqueConstraintError) {
    // Erro de violação de chave única (como tentar inserir um valor duplicado)
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (erro instanceof DatabaseError) {
    // Erro relacionado ao banco de dados (geralmente erros SQL)
    new NaoEncontrado("Erro no banco de dados").enviarResposta(res);
  } else if (erro instanceof ErroBase) {
    erro.enviarResposta(res);
  } else {
    // Para outros tipos de erro, pode enviar um erro genérico
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;
