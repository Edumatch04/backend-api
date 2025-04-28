import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const Publicacao = sequelizeAdventistaTucuruvi.define("Publicacao", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  pdf_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  data_publicacao: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  school_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  materia_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo: { 
    type: DataTypes.ENUM("Desafios", "Trabalhos", "Reforços", "Avisos"),
    allowNull: false,
  }
}, {
  tableName: "publicacao",
  timestamps: false
});

export default Publicacao;
