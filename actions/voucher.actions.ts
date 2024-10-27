"use server";

import { VoucherFormValues } from '@/types/voucher.types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveVoucher(data: VoucherFormValues) {
    try {
        const voucher = await prisma.voucher.create({
            data: {
                clientName: data.clientName,
                bookingId: data.bookingId || generateBookingId(),
                hotelNo: data.hotelNo,
                adultNo: data.adultNo,
                childrenNo: data.childrenNo,
                totalNights: data.totalNights,
                cabDetails: data.cabDetails,
                itinerary: {
                    create: data.itinerary.map(item => ({
                        hotelName: item.hotelName,
                        nights: item.nights,
                        fromDate: new Date(item.fromDate),
                        toDate: new Date(item.toDate),
                        description: item.description,
                    }))
                }
            }
        });
        return voucher;
    } catch (error) {
        console.error('Error saving voucher:', error);
        throw new Error('Failed to save voucher');
    }
}

function generateBookingId(length: number = 8): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}