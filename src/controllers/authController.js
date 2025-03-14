import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Escola from "../models/escolaModel.js";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.JWT_SECRET;

class AuthController {
    static login = async (req, res, next) => {
        try {
            const { email_admin, senha } = req.body;

            const escola = await Escola.findOne({ where: { email_admin } });
            if (!escola) {
                return res.status(401).json({ message: "E-mail ou senha inválidos." });
            }

            const senhaValida = await bcrypt.compare(senha, escola.senha);
            if (!senhaValida) {
                return res.status(401).json({ message: "E-mail ou senha inválidos." });
            }

            const token = jwt.sign({ id: escola.id, email: escola.email_admin, tipo: escola.tipo }, secretKey, { expiresIn: "1h" });

            res.status(200).json({ message: "Login realizado com sucesso!", token });
        } catch (erro) {
            next(erro);
        }
    };
}

export default AuthController;
