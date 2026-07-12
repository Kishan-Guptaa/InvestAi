import { PrismaClient } from '@prisma/client';

// Singleton instance of PrismaClient
export const prisma = new PrismaClient();

// Handle graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
