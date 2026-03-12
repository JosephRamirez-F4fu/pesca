import { ClientRepository } from "../../repositories/client.repository";

export class DeleteClientUseCase {
  private clientRepository = new ClientRepository();

  async execute(id: number) {
    await this.clientRepository.delete(id);
  }
}
