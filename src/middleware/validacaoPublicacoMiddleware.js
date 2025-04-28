import { validationResult } from "express-validator";

const validarCamposPublicacao = (req, res, next) => {
  const { titulo, conteudo, pdf_url, materia_id, tipo } = req.body;

  if (!titulo || !materia_id || !tipo) {
    return res.status(400).json({ message: "Os campos 'titulo', 'materia_id' e 'tipo' são obrigatórios." });
  }

  if (pdf_url && !pdf_url.startsWith('http')) {
    return res.status(400).json({ message: "A URL do PDF deve ser válida." });
  }

  if (!conteudo) {
    return res.status(400).json({ message: "O campo 'conteudo' é opcional, mas se fornecido, não pode ser vazio." });
  }

  next();
};

export default validarCamposPublicacao;
