import { DataTypes } from "sequelize";
import { sequelizeEscolas } from "../config/dbConnect.js";

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
    cnpj: {
        type: DataTypes.STRING(18),
        allowNull: false,
        unique: true,
    },
    endereco: {
        type: DataTypes.STRING,
    },
    cep: {
        type: DataTypes.STRING(10),
    },
    cidade: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.STRING(2),
    },
    email_admin: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.ENUM("publica", "privada"),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('ativa', 'inativa'),
        allowNull: false,
        defaultValue: 'ativa',
    },
    nivel_ensino: {
        type: DataTypes.ENUM('infantil', 'fundamental', 'medio', 'superior'),
        defaultValue: 'fundamental', 
    },
    data_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
    },
    data_atualizacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
        onUpdate: DataTypes.NOW, 
    },
}, {
    tableName: "cadastro", 
    timestamps: false, 
});

export default Escola;
