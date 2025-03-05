import { DataTypes } from "sequelize";
import { sequelizeEscolas } from "../config/dbConnect.js"; // Importa o Sequelize já configurado

const Escola = sequelizeEscolas.define("Escola", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false, // Impede valores NULL
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
    allowNull: true, // Pode ser opcional
  },
}, {
  tableName: "escolas",
  timestamps: false, // Desativa createdAt e updatedAt, se não forem usados
});

export default Escola;
