import { db } from "../../../core/config/db";
import { Person } from "./../entities/person";

export class PersonRepository {
  async create(person: Person): Promise<Person> {
    const person_created = await db.person.create({
      data: {
        name: person.name,
        phone: person.phone,
      },
    });
    return person_created;
  }
  async findById(id: number): Promise<Person | null> {
    const person = await db.person.findUnique({
      where: {
        id: id,
      },
    });
    return person;
  }

  async findAll(): Promise<Person[]> {
    const person = await db.person.findMany();
    return person;
  }

  async update(id: number, person: Person): Promise<void> {
    await db.person.update({
      where: {
        id: id,
      },
      data: {
        name: person.name,
        phone: person.phone,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await db.person.delete({
      where: {
        id: id,
      },
    });
  }
}
