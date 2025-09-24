import Alunos from "../Models/alunos.js";

export default class AlunosController{


gravar(requisicao, resposta){
    if (requisicao.method === "POST" && requisicao.is("application/json")) { 
           const dados = requisicao.body;
           const cpf = requisicao.params.cpf;
           const matricula = dados.matricula ?? dados.id_matricula ?? null;
           
        if (cpf && dados.nome && dados.sobrenome && dados.ra && dados.cep && matricula ){
            
            const alunos = new Alunos(
                cpf, 
                dados.nome, 
                dados.sobrenome, 
                dados.ra, 
                dados.cep, 
                matricula
            );

            alunos.gravar()
            .then(()=>{
                resposta.status(200).json({
                    status: true,
                    mensagem: "Aluno gravado com sucesso"
                });
            })
            .catch((erro) =>{
               resposta.status(500).json({
                status: false,
                mensagem: "Erro ao gravar o aluno: " + erro.message
               });     
            });  //é um método assíncrono
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Informe todos os dados do aluno (Nome, Sobrenome, RA, CEP, Matricula). o cpf deve ser informado na url."
            });
        }
        }
            
    
        else{
            resposta.status(400).json({
                status:false,
                mensagem: "Requisição inválida"
            });
        }
    };
    alterar(requisicao, resposta){
     if ((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is("application/json"))
        { 
           const dados = requisicao.body;
           //http://localhost:4000/alunos/376.182.308-89
           const cpf = requisicao.params.cpf;  //cpf ser informado na url
           const matricula = dados.matricula ?? dados.id_matricula ?? null;

        if (cpf && dados.nome && dados.sobrenome && dados.ra && dados.cep && matricula ){
            const alunos = new Alunos(cpf, dados.nome, dados.sobrenome, dados.ra, dados.cep, matricula);
            alunos.alterar()
            .then(()=>{
                resposta.status(200).json({
                    status: true,
                    mensagem: "Aluno atualizado com sucesso"
                });
            })
            .catch((erro) =>{
               resposta.status(500).json({
                status: false,
                mensagem: "Erro ao atualizar o aluno: " + erro.message
               });     
            });  //é um método assíncrono
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Informe todos os dados do aluno (CPF, Nome, Sobrenome, RA, CEP, Matricula)"
            });
        }
        }         
        else{
            resposta.status(400).json({
                status:false,
                mensagem: "Requisição inválida"
            });
        }};
        
    excluir(requisicao, resposta){
        if(requisicao.method === "DELETE"){
            const cpf = requisicao.params.cpf;
            if(cpf){
                const alunos = new Alunos();
                alunos.consultarCPF(cpf)
                .then((listaAlunos) => {
                    const encontrado = listaAlunos[0];
                    if(encontrado){
                        encontrado.excluir()
                        .then(() => {
                            resposta.status(200).json({
                                status: true,
                                mensagem: "Aluno excluido com sucesso"
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                status: false,
                                mensagem: "Erro ao excluir o aluno: " + erro.message
                            });
                        });
                    }
                    else{
                        resposta.status(404).json({
                            status: false,
                            mensagem: "Aluno não encontrado"
                        })
                    }

                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao consultar o aluno para exclusão: " + erro.message
                    });
               });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informar o CPF do aluno"
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    };
    consultar(requisicao, resposta){
        if (requisicao.method === "GET"){
            const cpf = requisicao.params.cpf;
            const alunos = new Alunos();
            if(cpf){
                alunos.consultarCPF(cpf)
                .then((listaAlunos) => {
                    if (listaAlunos.length > 0 ) {
                     resposta.status(200).json({
                        status: true,
                        mensagem: "Consulta realizada com sucesso",
                        alunos: listaAlunos
                    });

                    }
                    else{
                        resposta.status(404).json({
                            status: false,
                            mensagem: "Aluno não encontrado"
                        });
                    }
                    
                        
                })

                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao consultar o aluno: " + erro.message
                    });

                  });  

            }
            else{
                alunos.consultar()
                .then((listaAlunos)=>{
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Consulta realizada com sucesso",
                        alunos: listaAlunos
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao consultar o aluno: " + erro.message
                    });
                });
            }  


        }
        
        else{
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    };
}