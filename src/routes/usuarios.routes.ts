import { Router } from "express";

import UsuariosController from "../app/controllers/UsuariosController";

const usuariosRouter = Router();

usuariosRouter.post("/", async (req, res) => {
    try {
        const { nome, email, password } = req.body;

        const usuariosController = new UsuariosController();

        const user = await usuariosController.store({
            nome,
            email,
            password,
        });

        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default usuariosRouter;
