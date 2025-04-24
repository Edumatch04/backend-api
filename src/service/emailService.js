import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kael.requena@edumatch.com.br',
    pass: 'MarianaKael12#',
  },
});

export const enviarEmailConfirmacao = (email, codigo) => {
  const templatePath = path.join(__dirname, '../templates', 'confirmacao.html');
  let html = fs.readFileSync(templatePath, 'utf8');
  html = html.replace('{{codigo}}', codigo);

  return transporter.sendMail({
    from: 'kaelr24@gmail.com',
    to: email,
    subject: 'Confirmação de Código',
    html: html,
  });
};