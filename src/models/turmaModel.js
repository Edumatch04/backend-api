import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const Turma = sequelizeAdventistaTucuruvi.define("Turma", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  periodo: {
    type: DataTypes.ENUM('matutino', 'vespertino', 'noturno'),
    allowNull: false
  },
  school_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users", 
      key: "school_id"
    }
  }
}, {
  tableName: "turmas",
  timestamps: false,
  indexes: [
    {
      unique: true,
      name: "nome_periodo_school",
      fields: ['nome', 'periodo', 'school_id']
    }
  ]
});

export default Turma;
