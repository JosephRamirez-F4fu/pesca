import { ClientRepository } from "../../repositories/client.repository";

export class GetAllClientUseCase {
  private clientRepository = new ClientRepository();
  async execute() {
    const clients = await this.clientRepository.findAll();
    return clients;
  }
}
