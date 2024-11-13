import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export default async function getCurrentUser() {
    const session = await auth();
    if (!session?.user) {
        return null;
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email as string,
        },
    });
    if (!currentUser) {
        return null;
    }

    const isAdmin = currentUser.isAdmin;

    return {
        ...currentUser,
        createdAt: currentUser.createdAt.toISOString(),
        updatedAt: currentUser.updatedAt.toISOString(),
        emailVerified: currentUser.emailVerified?.toISOString() || null,
        isAdmin: isAdmin,
    };
}
