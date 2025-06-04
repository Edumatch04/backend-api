import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const Frequencia = sequelizeAdventistaTucuruvi.define("Frequencia", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  aluno_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "alunos",
      key: "id",
    },
  },
  publicacao_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "publicacao",
      key: "id",
    },
  },
  tipo_publicacao: {
    type: DataTypes.ENUM('Desafio', 'Trabalho', 'Reforço'),
    allowNull: false,
  },
  data_hora: { 
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  ofensiva: {
    type: DataTypes.INTEGER,
    defaultValue: 1, 
  },
}, {
  tableName: "frequencias",
  timestamps: false,
});

export default Frequencia;
