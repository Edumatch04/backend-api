import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const QuestaoDesafio = sequelizeAdventistaTucuruvi.define("QuestaoDesafio", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
},
  desafio_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: "desafios", key: "id" } 
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
    tableName: "questoes_desafio", 
    timestamps: false 
});

export default QuestaoDesafio;
