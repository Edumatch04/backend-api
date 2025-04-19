import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const Acesso = sequelizeAdventistaTucuruvi.define("Acesso", {
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
