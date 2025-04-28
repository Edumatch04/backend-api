import { body, validationResult } from "express-validator";

const validarResposta = [
  body("publicacao_id").isInt().withMessage("O ID da publicação é obrigatório."),
  body("pdf_url").notEmpty().withMessage("A URL do PDF é obrigatória."),
];

const validarErros = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export { validarResposta, validarErros };
