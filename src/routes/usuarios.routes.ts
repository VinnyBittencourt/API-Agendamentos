import { request, Router } from "express";
import { getRepository } from "typeorm";
import multer from "multer";

import UsuariosController from "../app/controllers/UsuariosController";
import Usuarios from "../app/models/Usuarios";
import ensureAthen from "../middlewares/ensureAuthenticated";
import uploadConfig from "../config/upload";

const usuariosRouter = Router();

const upload = multer(uploadConfig);

usuariosRouter.post("/", async (req, res) => {
    try {
        const { nome, email, password } = req.body;

        const usuariosController = new UsuariosController();

        const user = await usuariosController.store({
            nome,
            email,
            password,
        });

        user.password = "";

        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

usuariosRouter.get("/", ensureAthen, async (req, res) => {
    const usuariosRepositorio = getRepository(Usuarios);
    const user = await usuariosRepositorio.find();
    // console.log(req.user);

    return res.status(200).json(user);
});

usuariosRouter.get("/:id", ensureAthen, async (req, res) => {
    const usuariosRepositorio = getRepository(Usuarios);
    const { id } = req.params;
    const user = await usuariosRepositorio.findOne(id);
    return res.status(200).json(user);
});

usuariosRouter.delete("/:id", ensureAthen, async (req, res) => {
    const usuariosRepositorio = getRepository(Usuarios);
    const { id } = req.params;
    await usuariosRepositorio.delete(id);
    return res.status(200).send();
});

usuariosRouter.patch("/avatar", upload.single("avatar"), async (req, res) => {
    console.log(req.file);
    return res.json({ ok: true });
});

export default usuariosRouter;
