import { ClientRepository } from "../../repositories/client.repository";
import { CreateClientDto } from "./../../dtos/client/create.dto";

export class UpdateClientUseCase {
  private clientRepository = new ClientRepository();

  async execute(id: number, client: CreateClientDto) {
    return await this.clientRepository.update(id, client);
  }
}
