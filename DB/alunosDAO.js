import Alunos from "../Models/alunos";
import conectar from "./conexao.js";

export default class AlunosDAO{


    async gravar(alunos){

        if (alunos instanceof Alunos) {
            const conexao = await conectar();
            "INSERT INTO alunos (cpf_alu, nome_alu, sobrenome_alu, ra_alu, cep_alu) VALUES (?,?,?,?,?)";
            const parametros = [
                alunos.cpf,
                alunos.nome,
                alunos.sobrenome,
                alunos.RA,
                alunos.cep,
                alunos.id_matricula //(chave estrangeira )

            ];

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
                alunos.RA,
                alunos.cep,
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
            mat.id_matricula,
            mat.data_matricula,
            cur.id_curso,
            cur.nome_curso,
            cur.carga_horaria,
            cur.valor
        FROM alunos alu
        INNER JOIN matriculas mat  ON mat.cpf_alu = alu.cpf_alu
        INNER JOIN cursos cur      ON cur.id_curso = mat.id_curso
        WHERE alu.cpf_alu = ?
        ORDER BY mat.data_matricula DESC
    `;
        const [registros] = await conexao.query(sql, [cpf]);
        await conexao.release();


        let listaAlunos = [];
        for (const registro of registros){
            const alunos = new Alunos(registro.mat_cpf, registro.mat_nome, registro.mat_curso);
            const matricula = new Matricula(registro.mat_cpf,
                                            registro.mat_nome,
                                            registro.mat_curso);
                listaAlunos.push(alunos);
        }

        return listaAlunos;
    }

    async consultarCPF(cpf){
        cpf = cpf || ' ';
        const conexao = await conectar();

        const sql = `
        SELECT
            alu.cpf_alu,
            alu.nome_alu,
            alu.sobrenome_alu,
            mat.id_matricula,
            mat.data_matricula,
            cur.id_curso,
            cur.nome_curso,
            cur.carga_horaria,
            cur.valor
        FROM alunos alu
        INNER JOIN matriculas mat  ON mat.cpf_alu = alu.cpf_alu
        INNER JOIN cursos cur      ON cur.id_curso = mat.id_curso
        WHERE alu.cpf_alu = ?
        ORDER BY mat.data_matricula DESC
    `;
        const [registros] = await conexao.query(sql, [cpf]);
        await conexao.release();


        let listaAlunos = [];
        for (const registro of registros){
            const alunos = new Alunos(registro.mat_cpf, registro.mat_nome, registro.mat_curso);
            const matricula = new Matricula(registro.mat_cpf,
                                            registro.mat_nome,
                                            registro.mat_curso);
                listaAlunos.push(alunos);
        }

        return listaAlunos;
    }
}
