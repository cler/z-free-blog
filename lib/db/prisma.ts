import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient({
    log: ['query'],
});

export default prisma;