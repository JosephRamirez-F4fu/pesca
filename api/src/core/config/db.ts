import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

const initalize_roles = async () => {
  const roles = ["USER", "ADMIN"];
  for (const role of roles) {
    const roleFound = await db.role.findUnique({
      where: {
        name: role,
      },
    });
    if (!roleFound) {
      await db.role.create({
        data: {
          name: role,
        },
      });
    }
  }
};

initalize_roles()
  .then(() => {
    console.log("Roles initialized");
  })
  .catch((err) => {
    console.log(err);
  });
