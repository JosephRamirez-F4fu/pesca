import { Viaje,ViajeDTO, IViajeRepository } from "@/pesca/domain";
import { ViajeModel } from "@/pesca/framework/orm/models";

export class ViajeRepositoryPostgre implements IViajeRepository {

    async createViaje(viaje: ViajeDTO): Promise<Viaje> {
        const viajeModel = await ViajeModel.create({
            petroleo_cargado: viaje.petroleo_cargado,
            petroleo_consumido: viaje.petroleo_consumido,
            petroleo_restante: viaje.petroleo_restante,
            flota_id: viaje.flota_id
        });
        await viajeModel.save();
        return {
            id: viajeModel.id,
            petroleo_cargado: viajeModel.petroleo_cargado,
            petroleo_consumido: viajeModel.petroleo_consumido,
            petroleo_restante: viajeModel.petroleo_restante,
            flota_id: viajeModel.flota_id
        };
    }

     async getViajes(): Promise<Viaje[]> {
        const viajes = await ViajeModel.findAll();
        return viajes.map((viaje) => {
            return {
                id: viaje.id,
                petroleo_cargado: viaje.petroleo_cargado,
                petroleo_consumido: viaje.petroleo_consumido,
                petroleo_restante: viaje.petroleo_restante,
                flota_id: viaje.flota_id
            };
        });
    }

    async getViajeById(id: number): Promise<Viaje | null> {
        const viaje = await ViajeModel.findByPk(id);
        if (!viaje) {
            return null;
        }
        return {
            id: viaje.id,
            petroleo_cargado: viaje.petroleo_cargado,
            petroleo_consumido: viaje.petroleo_consumido,
            petroleo_restante: viaje.petroleo_restante,
            flota_id: viaje.flota_id
        };
    }


    async updateViaje(id: number, viaje: ViajeDTO): Promise<Viaje | null> {
        const viajeToUpdate = await ViajeModel.findByPk(id);
        if (!viajeToUpdate) {
            return null;
        }
        viajeToUpdate.petroleo_cargado = viaje.petroleo_cargado;
        viajeToUpdate.petroleo_consumido = viaje.petroleo_consumido;
        viajeToUpdate.petroleo_restante = viaje.petroleo_restante;
        viajeToUpdate.flota_id = viaje.flota_id;
        await viajeToUpdate.save();
        return {
            id: viajeToUpdate.id,
            petroleo_cargado: viajeToUpdate.petroleo_cargado,
            petroleo_consumido: viajeToUpdate.petroleo_consumido,
            petroleo_restante: viajeToUpdate.petroleo_restante,
            flota_id: viajeToUpdate.flota_id
        };
    }

    async deleteViaje(id: number): Promise<Viaje | null> {
        const viajeToDelete = await ViajeModel.findByPk(id);
        if (!viajeToDelete) {
            return null;
        }
        await viajeToDelete.destroy();
        return {
            id: viajeToDelete.id,
            petroleo_cargado: viajeToDelete.petroleo_cargado,
            petroleo_consumido: viajeToDelete.petroleo_consumido,
            petroleo_restante: viajeToDelete.petroleo_restante,
            flota_id: viajeToDelete.flota_id
        };
    }

    async getViajesByFlotaId(flotaId: number): Promise<Viaje[]> {
        const viajes = await ViajeModel.findAll({ where: { flota_id: flotaId } });
        return viajes.map((viaje) => {
            return {
                id: viaje.id,
                petroleo_cargado: viaje.petroleo_cargado,
                petroleo_consumido: viaje.petroleo_consumido,
                petroleo_restante: viaje.petroleo_restante,
                flota_id: viaje.flota_id
            };
        });
    }

}
