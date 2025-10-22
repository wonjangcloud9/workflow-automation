import { z } from 'zod';
import { protectedProcedure, createTRPCRouter } from '../init';
import prisma from '@/lib/db';
export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(async () => {
    const users = await prisma.user.findMany();
    return users;
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;