import { getRepository } from "typeorm";

import Usuarios from "../models/Usuarios";

interface Request {
    nome: string;
    email: string;
    password: string;
}

class UsuariosController {
    public async store({ nome, email, password }: Request): Promise<Usuarios> {
        const usuariosRepository = getRepository(Usuarios);

        const verificaUsuarioExiste = await usuariosRepository.findOne({
            where: { email },
        });

        if (verificaUsuarioExiste) {
            throw new Error("Endereço de email já cadastrado");
        }

        const user = usuariosRepository.create({
            nome,
            email,
            password,
        });

        await usuariosRepository.save(user);

        return user;
    }
}

export default UsuariosController;
