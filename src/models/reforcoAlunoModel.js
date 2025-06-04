import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const ReforcoAluno = sequelizeAdventistaTucuruvi.define("ReforcoAluno", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    reforco_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: "reforcos", key: "id" } 
    },
    aluno_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: "alunos", key: "id" } 
    }
}, { 
    tableName: "reforcos_alunos", 
    timestamps: false 
});

export default ReforcoAluno;