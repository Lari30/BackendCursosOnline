import Alunos from "../Models/alunos.js";
import conectar from "./conexao.js";

export default class AlunosDAO{


    async gravar(alunos){

        if (alunos instanceof Alunos) {
            const conexao = await conectar();
            const sql = "INSERT INTO alunos (cpf_alu, nome_alu, sobrenome_alu, ra_alu, cep_alu, id_matricula) VALUES (?,?,?,?,?,?)";
            const parametros = [
                alunos.cpf,
                alunos.nome,
                alunos.sobrenome,
                alunos.ra,
                alunos.cep,
                alunos.matricula //(chave estrangeira )

            ];

            console.log(">>> Parametros gravar:", parametros);


            await conexao.execute(sql, parametros);
            conexao.release(); // devolve a conexao para o pool

           


        }
    }

    async alterar(alunos){
        if (alunos instanceof alunos){
            const conexao = await conectar();
            const sql = "UPDATE alunos SET nome_alu = ?, sobrenome_alu = ?, ra_alu = ?, cep_alu = ? WHERE cpf_alu = ? ";
            const parametros = [
                alunos.nome,
                alunos.sobrenome,
                alunos.ra,
                alunos.cep,
                alunos.matricula,
                alunos.cpf

            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(alunos){
        if(alunos instanceof Alunos){
            const conexao = await conectar();
            const sql = "DELETE FROM alunos WHERE cpf_alu = ?";
            const parametros = [alunos.cpf];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(){
        const conexao = await conectar();

        const sql = `
        SELECT
            alu.cpf_alu,
            alu.nome_alu,
            alu.sobrenome_alu,
            alu.ra_alu,
            alu.cep_alu,
            alu.id_matricula,
        FROM alunos alu
        `;
        const [registros] = await conexao.query(sql);
        await conexao.release();


        return registros.map(registro =>
        new Alunos(
            registro.cpf_alu,
            registro.nome_alu,
            registro.sobrenome_alu,
            registro.ra_alu,
            registro.cep_alu,
            registro.id_matricula
        )
     );
  }


    async consultarCPF(cpf){
        const conexao = await conectar();

        const sql = `
        SELECT
            alu.cpf_alu,
            alu.nome_alu,
            alu.sobrenome_alu,
            alu.ra_alu,
            alu.cep_alu,
            alu.id_matricula
        FROM alunos alu
        WHERE alu.cpf_alu = ?
    `;
        const [registros] = await conexao.query(sql, [cpf]);
        await conexao.release();


        return registros.map(registro =>
        new Alunos(
            registro.cpf_alu,
            registro.nome_alu,
            registro.sobrenome_alu,
            registro.ra_alu,
            registro.cep_alu,
            registro.id_matricula
        )
    );
    }
}
