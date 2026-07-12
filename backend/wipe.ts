import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.analysis.deleteMany();
  console.log("Deleted all analyses.");
}
main().catch(console.error).finally(() => prisma.$disconnect());
