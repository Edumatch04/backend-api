import { DataTypes } from 'sequelize';
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const Acesso = sequelizeAdventistaTucuruvi.define('Acesso', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  aluno_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Alunos',
      key: 'id',
    },
  },
  data: {
    type: DataTypes.DATEONLY, 
    allowNull: false,
  },
  tempo_total: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'acessos', 
  timestamps: false, 
});

export default Acesso;
