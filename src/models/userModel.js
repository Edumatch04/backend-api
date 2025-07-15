import { DataTypes } from "sequelize";
import { sequelizeEscolas } from "../config/dbConnect.js";

const User = sequelizeEscolas.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    school_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('Escola', 'Professor', 'Diretor', 'Vice Diretor', 'Coordenador', 'Secretario', 'Financeiro', 'Aluno', 'Tutor'),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: "users",
    timestamps: false,
});

export default User;
