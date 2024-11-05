'use server';

import { PrismaClient } from '@prisma/client';
import * as LucideIcons from 'lucide-react';

const prisma = new PrismaClient();

interface ThemeData {
    label: string;
    iconName: string;
    description: string;
}

export interface CardData {
    id: string;
    icon: string;
    label: string;
    description: string;
}

export async function createTheme(data: ThemeData) {
    try {
        const icon = (LucideIcons as any)[data.iconName];
        if (!icon) {
            return { success: false, error: `Icon ${data.iconName} not found in lucide-react` };
        }

        const existingTheme = await prisma.theme.findUnique({
            where: { label: data.label },
        });

        if (existingTheme) {
            return { success: false, error: 'A theme with this label already exists' };
        }

        const newTheme = await prisma.theme.create({
            data: {
                label: data.label,
                iconName: data.iconName,
                description: data.description,
            },
        });

        return { success: true, theme: newTheme };
    } catch (error) {
        console.error('Error creating theme:', error);
        return { success: false, error: 'Failed to create theme' };
    }
}

export async function getCards(): Promise<CardData[]> {
    try {
        const cards = await prisma.theme.findMany();
        return cards.map(card => ({
            id: card.id,
            icon: card.iconName,
            label: card.label,
            description: card.description,
        }));
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw new Error('Failed to fetch cards');
    }
}