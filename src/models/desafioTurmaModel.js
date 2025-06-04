import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const DesafioTurma = sequelizeAdventistaTucuruvi.define("DesafioTurma", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  desafio_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: "desafios", key: "id" }
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
  tableName: "desafios_turmas", 
  timestamps: false 
});

export default DesafioTurma;
