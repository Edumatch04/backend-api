import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const AlternativaQuestaoDesafio = sequelizeAdventistaTucuruvi.define("AlternativaQuestaoDesafio", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
},
  questao_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: "questoes_desafio", key: "id" } 
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
    tableName: "alternativas_desafio", 
    timestamps: false 
});

export default AlternativaQuestaoDesafio;
