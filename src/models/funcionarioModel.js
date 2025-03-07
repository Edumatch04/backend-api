import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";
import Professor from "./professorModel.js";

const Funcionario = sequelizeAdventistaTucuruvi.define("Funcionario", {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    nome: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    nome_usuario: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    cargo: {
        type: DataTypes.ENUM("Professor", "Diretor", "Vice Diretor", "Coordenador", "Secretário", "Financeiro"),
        allowNull: false,
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone: { 
        type: DataTypes.STRING 
    },
    data_contratacao: { 
        type: DataTypes.DATE 
    },
}, {
    tableName: "funcionarios", 
    timestamps: false,    
});

Funcionario.hasOne(Professor, { foreignKey: "funcionario_id", onDelete: "CASCADE" });

export default Funcionario;
