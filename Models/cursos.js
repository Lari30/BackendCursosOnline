import CursosDAO from "../DB/cursosDAO.js";
export default class Cursos {

    #id;
    #nome; //NOME DO CURSO
    #ch;  //CARGA HORÁRIA
    #professor;
    #valor

    constructor (id = 0, nome = "", ch = "", professor = "", valor = "" ){
        this.#id = id;
        this.#nome = nome;
        this.#ch = ch;
        this.#professor = professor;
        this.#valor = valor;
    }

    get id(){
        return this.#id
    }
    set id(id) {
        this.#id = id
    }

    get nome(){
        return this.#nome
    }
    set nome(nome){
        this.#nome = nome
    }

    get ch(){
        return this.#ch
    }
    set ch(ch){
        this.#ch = ch
    }

    get professor(){
        return this.#professor
    }
    set professor(professor){
        return this.#professor
    }

    get valor(){
        return this.#valor
    }
    set valor(valor){
        return this.#valor
    }

    toString(){
        return ` 
        ID: ${this.#id}\n 
        Nome: ${this.#nome}\n
        CH: ${this.#ch}\n
        Professor: ${this.#professor}\n
        Valor: ${this.#valor}\n
        
        `;
    }

    toJSON(){ 
        return{
            id: this.#id,
            nome: this.#nome,
            ch: this.#ch,
            professor: this.#professor,
            valor: this.#valor
    }

    }

    async gravar(){
        const cursosDAO = new CursosDAO();
        await cursosDAO.gravar(this);
    }

    async alterar(){
        const cursosDAO = new CursosDAO();
        await cursosDAO.alterar(this);
    }

    async excluir(){
        const cursosDAO = new CursosDAO();
        await cursosDAO.excluir(this);
    }

    async consultar(){
        const cursosDAO = new CursosDAO();
        return await cursosDAO.consultar(this);
    }


}