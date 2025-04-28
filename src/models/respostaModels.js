import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const Resposta = sequelizeAdventistaTucuruvi.define("Resposta", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  publicacao_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Publicacao",
      key: "id",
    },
  },
  aluno_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Aluno", 
      key: "id",
    },
  },
  pdf_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  tipo_publicacao: {
    type: DataTypes.STRING(255),
    allowNull: false, 
  },
  data_resposta: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "respostas",
  timestamps: false,
});

export default Resposta;
