import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const Aluno = sequelizeAdventistaTucuruvi.define("Aluno", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ra: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, 
    },
    tipo: {
        type: DataTypes.ENUM('Aluno', 'Tutor'),
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nome_usuario: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    turma: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    periodo: {
        type: DataTypes.ENUM('matutino', 'vespertino', 'noturno'),
        allowNull: false,
    },
    genero: {
        type: DataTypes.ENUM('masculino', 'feminino', 'outro'),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    school_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users", 
            key: "school_id"
        }
    }
}, {
    tableName: "alunos", 
    timestamps: false,    
});

export default Aluno;
