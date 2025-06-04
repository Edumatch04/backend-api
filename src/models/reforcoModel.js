import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const Reforco = sequelizeAdventistaTucuruvi.define("Reforco", {
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
    turma_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "turmas", key: "id" }
    },
    titulo: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
    },
    descricao: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    },
    data_criacao: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    }
}, { 
    tableName: "reforcos", 
    timestamps: false 
});

export default Reforco;