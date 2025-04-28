import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

export const sequelizeEscolas = new Sequelize(
  process.env.DB_NAME_ESCOLAS,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    timezone: "-03:00", 
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export const sequelizeAdventistaTucuruvi = new Sequelize(
  process.env.DB_NAME_ADVENTISTA_TUCURUVI,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    timezone: "-03:00", 
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

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
