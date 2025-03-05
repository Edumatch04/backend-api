import { DataTypes } from "sequelize";
import { sequelizeEscolas } from "../config/dbConnect.js"; // Corrigido para sequelizeEscolas

const Escola = sequelizeEscolas.define("Escola", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING,
    },
    telefone: {
        type: DataTypes.STRING,
    },
}, {
    tableName: "escolas",
    timestamps: false,
});

export default Escola;
