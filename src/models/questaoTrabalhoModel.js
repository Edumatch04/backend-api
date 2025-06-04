import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const QuestaoTrabalho = sequelizeAdventistaTucuruvi.define("QuestaoTrabalho", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
},
  trabalho_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: "trabalhos", key: "id" } 
},
  pergunta: { 
    type: DataTypes.TEXT, 
    allowNull: false 
},
  multipla_escolha: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false 
},
  tempo_segundos: { 
    type: DataTypes.INTEGER, 
    allowNull: true 
},
  valor: { 
    type: DataTypes.DECIMAL(5,2), 
    allowNull: true 
}
}, { 
    tableName: "questoes_trabalho", 
    timestamps: false 
});

export default QuestaoTrabalho;
