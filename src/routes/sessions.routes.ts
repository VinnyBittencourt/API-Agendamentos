import { Router } from "express";

import SessionsController from "../app/controllers/SesssionsUsuariosController";

const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        const sessionsController = new SessionsController();

        const { user, token } = await sessionsController.store({
            email,
            password,
        });

        user.password = "";

        return res.json({ user, token });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default sessionsRouter;
