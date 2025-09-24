import AlunosDAO from "../DB/alunosDAO.js";

export default class Alunos {

    //atributos privados da classe Alunos

    
    #cpf;
    #nome;
    #sobrenome;
    #ra;
    #cep;
    #matricula;
    

    constructor (cpf = "", nome = "", sobrenome = "", ra = "", cep = "", matricula = ""){
        this.#cpf = cpf;
        this.#nome = nome;
        this.#sobrenome = sobrenome;
        this.#ra = ra;
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

    get ra(){
        return this.#ra
    }
    set ra(ra){
        this.#ra = ra
    }

    get cep(){
        return this.#cep
    }
    set cep(cep){
        this.#cep = cep
    }

    get matricula(){
        return this.#matricula
    }

    set matricula(matricula){
        this.#matricula = matricula
    }

    toString(){
        return `
        CPF: ${this.#cpf}\n
        Nome  Completo: ${this.#nome} ${this.#sobrenome}\n
        RA: ${this.#ra}\n
        CEP: ${this.#cep}\n
        Matricula: ${this.#matricula}\n
        `;
    }

    toJSON(){
        return {
            cpf: this.#cpf,
            nome: this.#nome,
            sobrenome: this.#sobrenome,
            ra: this.#ra,
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
        return await alunosDAO.consultarCPF(this.#cpf);
    }





}