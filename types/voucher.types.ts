import { ItineraryItem } from "./itinerary.types";

export interface VoucherFormValues {
    clientName: string;
    bookingId: string;
    hotelNo: number;
    adultNo: number;
    childrenNo: number;
    totalNights: number;
    itinerary: ItineraryItem[];
    cabDetails: string;
}