import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: databaseUrl,
  }),
});

async function main() {
  await prisma.role.upsert({
    where: { name: "USER" },
    update: {},
    create: { name: "USER" },
  });

  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: { name: "ADMIN" },
  });

  const passwordHash = await bcrypt.hash("936135686", 10);

  await prisma.user.upsert({
    where: { code: "ANA" },
    update: {
      name: "ANA",
      password: passwordHash,
      id_role: adminRole.id,
    },
    create: {
      name: "ANA",
      code: "ANA",
      password: passwordHash,
      id_role: adminRole.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Prisma seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
