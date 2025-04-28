import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const Frequencia = sequelizeAdventistaTucuruvi.define("Frequencia", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  aluno_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "alunos",
      key: "id",
    },
  },
  ultimo_dia: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  ofensiva: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: "frequencias",
  timestamps: false,
});

export default Frequencia;
