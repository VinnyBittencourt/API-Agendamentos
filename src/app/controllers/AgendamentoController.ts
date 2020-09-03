import { getRepository } from "typeorm";

import Agendamentos from "../models/Agendamentos";

interface Request {
    prestador_servico_id: string;
    data: Date;
}

class AgendamentosController {
    public async store({
        prestador_servico_id,
        data,
    }: Request): Promise<Agendamentos> {
        const agendamentosRespository = getRepository(Agendamentos);
        const agendamento = agendamentosRespository.create({
            prestador_servico_id,
            data,
        });

        await agendamentosRespository.save(agendamento);

        return agendamento;
    }
}

export default AgendamentosController;
