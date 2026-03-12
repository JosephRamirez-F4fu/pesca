import { ClientRepository } from "../../repositories/client.repository";
import { CreateClientDto } from "./../../dtos/client/create.dto";

export class CreateClientUseCase {
  private clientRepository = new ClientRepository();

  async execute(client: CreateClientDto) {
    const client_created = await this.clientRepository.create(client);

    return client_created;
  }
}
