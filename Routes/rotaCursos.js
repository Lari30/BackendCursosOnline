import {Router} from "express";
import CursosController from "../Controllers/cursosController.js";

const cursosRouter = Router();

const cursosCtrl = new CursosController();
cursosRouter.get("/", cursosCtrl.consultar)
.get("/:id", cursosCtrl.consultar)
.post("/", cursosCtrl.gravar)
.put("/:id", cursosCtrl.alterar)
.delete("/:id", cursosCtrl.excluir);

export default cursosRouter;