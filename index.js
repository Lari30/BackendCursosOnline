import express from 'express';
import alunosRouter from './Routes/rotaAlunos.js';

const hostname = '0.0.0.0';
const porta = 4000;

const app = express();

//configurar servidor para receber dados no formato json
app.use(express.json()); //camada que sabe tratar os dados no formato json

app.use("/alunos", alunosRouter); // camada que sabe atender requisições no endpoint alunos

app.listen(porta, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${porta}`);
});
