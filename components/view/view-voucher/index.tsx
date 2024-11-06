'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FaHotel } from 'react-icons/fa6';
import { PiCarProfileBold } from 'react-icons/pi';
import { format, parseISO } from 'date-fns';
import { Noto_Sans } from 'next/font/google';
import LogoFull from '@/components/ui/features/LogoFull';

const notoSans = Noto_Sans({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

interface VoucherData {
    clientName: string;
    bookingId: string;
    hotelNo: number;
    adultNo: number;
    childrenNo: number;
    totalNights: number;
    itinary: Array<{
        hotelName: string;
        nights: number;
        fromDate: string;
        toDate: string;
        description: string;
    }>;
    cabDetails: string;
}

const ViewVoucher = () => {
    const [voucherData, setVoucherData] = useState<VoucherData | null>(null);
    const [showPrintButton, setShowPrintButton] = useState(true);

    const formattedDate = useCallback((dateString: string) => format(parseISO(dateString), 'dd-MM-yyyy'), []);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const itinary = JSON.parse(queryParams.get('itinary') || '[]');

        setVoucherData({
            clientName: queryParams.get('clientName') || '',
            bookingId: queryParams.get('bookingId') || '',
            hotelNo: parseInt(queryParams.get('hotelNo') || '1', 10),
            adultNo: parseInt(queryParams.get('adultNo') || '1', 10),
            childrenNo: parseInt(queryParams.get('childrenNo') || '0', 10),
            totalNights: parseInt(queryParams.get('totalNights') || '1', 10),
            itinary,
            cabDetails: queryParams.get('cabDetails') || '',
        });
    }, []);

    const handlePrint = useCallback(() => {
        setShowPrintButton(false);
        setTimeout(() => window.print(), 0);
        setTimeout(() => setShowPrintButton(true), 2000);
    }, []);

    const memoizedItinary = useMemo(() => voucherData?.itinary || [], [voucherData]);

    if (!voucherData) return <div>Loading...</div>;

    return (
        <div className={`w-full flex justify-center items-center ${notoSans.className} pb-10`}>
            <div className={`max-w-[894px]`}>
                <div className="bg-indigo-50 px-5 py-7">
                    <header className="flex justify-center items-center gap-2">
                        <LogoFull />
                    </header>
                    <div className="text-[18px] mt-4 text-black">
                        <div className="flex gap-2 font-medium">
                            Dear
                            <span className="font-semibold capitalize">{voucherData.clientName},</span>
                        </div>
                        <div className="mt-1 font-medium">
                            Thank you for choosing Travel Trail Holidays as your travel partner, we will make sure that
                            your upcoming trip will be perfect and unforgettable, the details of your upcoming trip are
                            as follows.
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="mt-1 font-bold text-indigo-700 text-xl">Your booking is confirmed</div>
                            <div className="mt-1 font-semibold flex items-center gap-2">
                                <span>Booking ID:</span>
                                <span>{voucherData.bookingId}</span>
                            </div>
                        </div>
                        <div className="mt-1 font-medium flex items-center gap-2">
                            <span>{voucherData.adultNo} Adult,</span>
                            <span>{voucherData.childrenNo} children</span>
                        </div>
                    </div>
                </div>
                <div className="px-5 py-7">
                    <h1 className="font-bold text-2xl">Hotel Summary</h1>
                    {memoizedItinary.map((item, index) => (
                        <div key={index} className="mt-7">
                            <div className="flex gap-10 items-center p-5">
                                <FaHotel size={100} color="#FACC15" className="" />
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-[22px] font-bold">{item.hotelName}</h1>
                                    <div className="flex gap-12 items-center text-xl">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-gray-400">Nights:</span>
                                            <span className="text-lg">
                                                {item.nights} {item.nights > 1 ? 'Nights' : 'Night'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-gray-400">checkin:</span>
                                            <span className="text-lg">{formattedDate(item.fromDate)}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-gray-400">checkout:</span>
                                            <span className="text-lg">{formattedDate(item.toDate)}</span>
                                        </div>
                                    </div>
                                    <p className="text-lg min-w-[200px] max-w-[600px]">{item.description}</p>
                                </div>
                            </div>
                            <div className="h-[1px] bg-gray-400 w-full mt-3"></div>
                        </div>
                    ))}
                    <div className="mt-7">
                        <div className="flex gap-10 items-center p-5">
                            <PiCarProfileBold size={100} color="#FACC15" />
                            <h1 className="text-[22px] font-bold">{voucherData.cabDetails}</h1>
                        </div>
                        <div className="h-[1px] bg-gray-400 w-full mt-3"></div>
                    </div>
                </div>
                <div className="px-5 py-7 block">
                    <h1 className="font-bold text-2xl">Important Information</h1>
                    <ul className="list-disc px-10 text-[16px] font-medium">
                        <li className="mt-3">
                            Each guest must carry a valid ID proof (Aadhaar Card, Driving License or Passport) PAN card
                            will not be accepted.
                        </li>
                        <li>
                            Checkin will be done at 1 pm and checkout will be done at 11am. This may change as per hotel
                            policy.
                        </li>
                        <li>Early checkin and late checkout is subject to availability and as per hotel policy.</li>
                        <li>Travel Trail Holidays Support: +91 9953276022, +91 7838088761</li>
                    </ul>
                </div>
                {showPrintButton && (
                    <div
                        onClick={handlePrint}
                        className="py-5 px-10 cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded font-medium w-full lg:w-fit text-center text-white hover:scale-105 transition-all duration-300"
                    >
                        Print
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(ViewVoucher);
