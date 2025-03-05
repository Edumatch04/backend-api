import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

// Conexão com o banco principal (escolas)
export const sequelizeEscolas = new Sequelize(
  process.env.DB_NAME_ESCOLAS,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Conexão com o banco adventista_tucuruvi
export const sequelizeAdventistaTucuruvi = new Sequelize(
  process.env.DB_ADVENTISTA_TUCURUVI,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Testando conexão
(async () => {
  try {
    await sequelizeEscolas.authenticate();
    console.log("Conectado ao banco de dados escolas!");

    await sequelizeAdventistaTucuruvi.authenticate();
    console.log("Conectado ao banco adventista_tucuruvi!");
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
  }
})();
