import { Role } from "../entities/role";
import { RoleDto } from "../dtos/role.dto";
import { db } from "../../../core/config/db";
export class RoleRepository {
  async save(role: RoleDto) {
    return await db.role.create({
      data: role,
    });
  }
  async findByName(name: string) {
    return await db.role.findUnique({
      where: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
