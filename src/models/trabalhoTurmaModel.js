import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const TrabalhoTurma = sequelizeAdventistaTucuruvi.define("TrabalhoTurma", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  trabalho_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: "trabalhos", key: "id" }
  },
  turma_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: "turmas", key: "id" }
  },
  periodo: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  data_limite: { 
    type: DataTypes.DATE, 
    allowNull: false 
  }
}, { 
  tableName: "trabalhos_turmas", 
  timestamps: false 
});

export default TrabalhoTurma;
