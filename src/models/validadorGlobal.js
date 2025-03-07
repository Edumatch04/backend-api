import { DataTypes } from "sequelize";
import { sequelizeEscolas } from "../config/dbConnect.js"; 

const Escola = sequelizeEscolas.define("Escola", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false, 
    validate: {
      notEmpty: {
        msg: "O campo nome não pode estar em branco.",
      },
    },
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "O campo endereço não pode estar em branco.",
      },
    },
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
}, {
  tableName: "escolas",
  timestamps: false, 
});

export default Escola;
