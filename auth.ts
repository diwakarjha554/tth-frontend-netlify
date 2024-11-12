import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Google from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client/edge';

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL_ACCELERATE,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google],
    pages: {
        signIn: '/auth/login',
    },
});
