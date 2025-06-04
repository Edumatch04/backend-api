import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const Trabalho = sequelizeAdventistaTucuruvi.define("Trabalho", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    materia_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: "materias", key: "id" } 
    },
    professor_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: "professores", key: "id" } 
    },
    titulo: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
    },
    descricao: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    },
    capa: { 
        type: DataTypes.STRING(255), 
        allowNull: true 
    },
    data_criacao: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    }
}, { 
    tableName: "trabalhos", 
    timestamps: false 
});

export default Trabalho;
