import { db } from "../../../core/config/db";
import { Client } from "./../entities/client";
import { CreateClientDto } from "./../dtos/client/create.dto";

export class ClientRepository {
  async create(client: CreateClientDto): Promise<Client> {
    const client_created = await db.client.create({
      data: {
        name: client.name,
        phone: client.phone,
        state: client.state,
      },
    });

    return client_created;
  }

  async findAll(): Promise<Client[]> {
    const clients = await db.client.findMany();
    return clients;
  }

  async findById(id: number): Promise<Client | null> {
    const client = await db.client.findUnique({
      where: {
        id,
      },
    });

    return client;
  }

  async update(id: number, client: CreateClientDto): Promise<Client> {
    const client_updated = await db.client.update({
      where: {
        id,
      },
      data: {
        name: client.name,
        phone: client.phone,
        state: client.state,
      },
    });

    return client_updated;
  }

  async delete(id: number): Promise<Client> {
    const client_deleted = await db.client.delete({
      where: {
        id,
      },
    });

    return client_deleted;
  }
}
