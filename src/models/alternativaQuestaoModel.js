import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const AlternativaQuestao = sequelizeAdventistaTucuruvi.define("AlternativaQuestao", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
},
  questao_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: "questoes_trabalho", key: "id" } 
},
  texto: { 
    type: DataTypes.TEXT, 
    allowNull: false 
},
  correta: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false 
}
}, { 
    tableName: "alternativas_questao", 
    timestamps: false 
});

export default AlternativaQuestao;
