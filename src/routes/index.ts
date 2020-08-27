import { Router } from "express";

import usuariosRouter from "./usuarios.routes";

const routes = Router();

routes.use("/usuarios", usuariosRouter);

export default routes;
