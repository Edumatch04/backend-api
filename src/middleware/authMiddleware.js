import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET;

const autenticarJWT = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Acesso negado! Token ausente ou inválido." });
    }

    const token = authHeader.replace("Bearer ", "").trim();

    try {
        const decoded = jwt.verify(token, secretKey);  
        req.usuario = decoded;  
        next();  
    } catch (erro) {
        return res.status(401).json({ message: "Token inválido ou expirado." });
    }
};

export default autenticarJWT;
