import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "../../generated/prisma/client";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const globalForDb = globalThis as typeof globalThis & {
  db?: PrismaClient;
};

export const db =
  globalForDb.db ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: databaseUrl,
    }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}

export { Prisma, PrismaClient };

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
