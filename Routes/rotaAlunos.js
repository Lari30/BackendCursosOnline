import {Router} from "express";
import AlunosController from "../Controllers/alunosController.js";

const alunosRouter = Router();

const alunosCtrl = new AlunosController();

//alunosRouter.get("/", (req, res) => alunosCtrl.consultar(req, res))
//.get("/:cpf", (req, res) => alunosCtrl.consultar(req, res))
//.post("/", alunosCtrl.gravar)
//.post("/", alunosCtrl.gravar)
//.put("/:cpf", alunosCtrl.alterar)
//.delete("/:cpf", alunosCtrl.excluir);

alunosRouter.get("/", alunosCtrl.consultar)
.get("/:cpf", alunosCtrl.consultar)
.post("/",(req, res) => alunosCtrl.gravar(req,res))
//.post("/", alunosCtrl.gravar)
.put("/:cpf", alunosCtrl.alterar)
.delete("/:cpf", alunosCtrl.excluir);

export default alunosRouter;