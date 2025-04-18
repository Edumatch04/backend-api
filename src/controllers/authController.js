import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js"; 
import Escola from "../models/escolaModel.js";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
const secretKey = process.env.JWT_SECRET;

class AuthController {
  static login = async (req, res, next) => {
    try {
      const { email_admin, nome, senha } = req.body;

      let user = null;
      if (email_admin) {
        user = await User.findOne({ where: { email: email_admin } });
      } else if (nome) {
        user = await User.findOne({ where: { nome } });
      }

      if (!user) {
        return res.status(401).json({ message: "E-mail, nome ou senha inválidos." });
      }

      const senhaValida = await bcrypt.compare(senha, user.password_hash);
      if (!senhaValida) {
        return res.status(401).json({ message: "E-mail, nome ou senha inválidos." });
      }

      const escola = await Escola.findOne({ where: { id: user.school_id } });
      if (!escola) {
        return res.status(500).json({ message: "Escola não encontrada para o usuário." });
      }

      const nomeBanco = escola.nome.toLowerCase().replace(/\s+/g, "_");

      const sequelizeEscola = new Sequelize(
        nomeBanco,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
          host: process.env.DB_HOST,
          dialect: "mysql",
          pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
        }
      );

      try {
        await sequelizeEscola.authenticate();
        console.log(`Conectado ao banco da escola: ${nomeBanco}`);
      } catch (error) {
        return res.status(500).json({ message: "Erro ao conectar ao banco da escola.", error });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, tipo: user.role, banco: nomeBanco, school_id: user.school_id },
        secretKey,
        { expiresIn: "720h" }
      );

      res.status(200).json({ message: "Login realizado com sucesso!", token, banco: nomeBanco });
    } catch (erro) {
      next(erro);
    }
  };
}

export default AuthController;
