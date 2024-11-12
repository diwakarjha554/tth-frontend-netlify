'use client';
import { useSession } from 'next-auth/react';

export default function getCurrentUser() {
    const { data: session } = useSession();

    if (!session?.user) {
        return null;
    }

    return session.user;
}
