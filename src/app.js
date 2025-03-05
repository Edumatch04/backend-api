import express from 'express';
import { sequelizeEscolas, sequelizeAdventistaTucuruvi } from "./config/dbConnect.js";
import manipulador404 from "./middleware/manipulador404.js";
import routes from "./routes/index.js"
import manipuladorDeErros from "./middleware/manipuladorDeErros.js";
import dotenv from 'dotenv';

dotenv.config();

// Testando a conexão com o banco de dados
sequelizeEscolas.authenticate()
  .then(() => {
    console.log('Conexão com o banco escolas feita com sucesso');
  })
  .catch((erro) => {
    console.error('Erro de conexão com o banco escolas:', erro);
  });

sequelizeAdventistaTucuruvi.authenticate()
  .then(() => {
    console.log('Conexão com o banco adventista_tucuruvi feita com sucesso');
  })
  .catch((erro) => {
    console.error('Erro de conexão com o banco adventista_tucuruvi:', erro);
  });

const app = express();
app.use(express.json());

// Definindo as rotas
routes(app);

// Middleware para lidar com erros 404
app.use(manipulador404);

// Middleware para lidar com erros
app.use(manipuladorDeErros);

export default app;
