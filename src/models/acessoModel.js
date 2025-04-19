import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js"; 

const Acesso = sequelize.define("Acesso", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  aluno_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  tempo_total: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: "acessos",
  timestamps: false
});

export default Acesso;
