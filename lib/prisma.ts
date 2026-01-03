import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Load environment variables
if (typeof window === 'undefined') {
  require('dotenv').config({ path: '.env.local' });
}

// PrismaClient singleton pattern with Prisma Accelerate extension
// Prevents multiple instances during development with hot reloading
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  } as any).$extends(withAccelerate());

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
