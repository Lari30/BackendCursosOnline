import AlunosDAO from "../DB/alunosDAO.js";

export default class Alunos {

    //atributos privados da classe Alunos

    
    #cpf;
    #nome;
    #sobrenome;
    #RA;
    #cep;
    #matricula;
    

    constructor (cpf = "", nome = "", sobrenome = "", RA = "", cep = "", cidade = {}){
        this.#cpf = cpf;
        this.#nome = nome;
        this.#sobrenome = sobrenome;
        this.#RA = RA;
        this.#cep = cep
        this.#matricula = matricula; //relacionamento da classe cliente e cidade
    }

    
    get cpf() {
        return this.#cpf
    }

    set cpf(cpf) {
        this.#cpf = cpf
    }

    get nome(){
        return this.#nome
    }

    set nome(nome){
        this.#nome = nome
    }

    get sobrenome(){
        return this.#sobrenome
    }
    set sobrenome(sobrenome){
        this.#sobrenome = sobrenome
    }

    get RA(){
        return this.#RA
    }
    set RA(RA){
        this.#RA = RA
    }

    get cep(){
        return this.#cep
    }
    set cep(cep){
        this.#cep = cep
    }

    get matri(){
        return this.#matricula
    }

    set matricula(matricula){
        this.#matricula = matricula
    }

    toString(){
        return `
        CPF: ${this.#cpf}\n
        Nome  Completo: ${this.#nome} ${this.#sobrenome}\n
        RA: ${this.#RA}\n
        CEP: ${this.#cep}\n
        Matricula: ${this.#matricula}\n
        `;
    }

    toJSON(){
        return {
            cpf: this.#cpf,
            nome: this.#nome,
            sobrenome: this.#sobrenome,
            ra: this.#RA,
            cep: this.#cep,
            matricula: this.#matricula
        }
    }

    async gravar(){
        const alunosDAO = new AlunosDAO();
        await alunosDAO.gravar(this);
    }
    async alterar(){
        const alunosDAO = new AlunosDAO;
        await alunosDAO.alterar(this);
    }
    async excluir(){
        const alunosDAO = new AlunosDAO;
        await alunosDAO.excluir(this);
    }
    async consultar(){
        const alunosDAO = new AlunosDAO;
        return await alunosDAO.consultar();
    }

    async consultarCPF(){
        const alunosDAO = new AlunosDAO;
        return await alunosDAO.consultarCPF(cpf);
    }





}