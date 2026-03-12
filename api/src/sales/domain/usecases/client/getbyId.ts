import { ClientRepository } from "../../repositories/client.repository";

export class FindByClientUseCase {
  private clientRepository = new ClientRepository();

  async execute(id: number) {
    const client = await this.clientRepository.findById(id);
    return client;
  }
}
