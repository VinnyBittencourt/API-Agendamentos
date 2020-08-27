import { Router } from "express";

const usuariosRouter = Router();

usuariosRouter.post("/", (req, res) => {
    try {
        return res.json({ ok: "Rota de usuario" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default usuariosRouter;
