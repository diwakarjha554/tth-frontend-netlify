'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Noto_Sans } from 'next/font/google';
import LogoFull from '@/components/ui/features/LogoFull';
import { FaPhoneAlt, FaRegArrowAltCircleRight } from 'react-icons/fa';
import { FaCheck, FaHotel, FaSuitcase } from 'react-icons/fa6';
import { RxCrossCircled } from 'react-icons/rx';
import Image from 'next/image';
import BulletPoints from './bullet-points';
import { MdRateReview } from 'react-icons/md';
import { AiFillThunderbolt } from 'react-icons/ai';

const notoSans = Noto_Sans({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

interface ItineraryFormValues {
    clientName: string;
    packageTitle: string;
    numberOfDays: number;
    numberOfNights: number;
    numberOfHotels: number;
    numberOfInclusions: number;
    numberOfExclusions: number;
    tripAdvisorName: string;
    tripAdvisorNumber: string;
    cabs: string;
    flights: string;
    totalTrips: number;
    totalReviews: number;
    quotePrice: number;
    pricePerPerson: number;
    days: Array<{
        dayNumber: number;
        summary: string;
        imageSrc: string;
        description: string;
    }>;
    hotels: Array<{
        placeName: string;
        placeDescription: string;
        hotelName: string;
        roomType: string;
        hotelDescription: string;
    }>;
    inclusions: Array<{ value: string }>;
    exclusions: Array<{ value: string }>;
}

const ViewItinerary = () => {
    const [itineraryData, setitineraryData] = useState<ItineraryFormValues | null>(null);
    const [showPrintButton, setShowPrintButton] = useState(true);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const days = JSON.parse(queryParams.get('days') || '[]');
        const hotels = JSON.parse(queryParams.get('hotels') || '[]');
        const inclusions = JSON.parse(queryParams.get('inclusions') || '[]');
        const exclusions = JSON.parse(queryParams.get('exclusions') || '[]');

        setitineraryData({
            clientName: queryParams.get('clientName') || '',
            packageTitle: queryParams.get('packageTitle') || '',
            numberOfDays: parseInt(queryParams.get('numberOfDays') || '1', 10),
            numberOfNights: parseInt(queryParams.get('numberOfNights') || '1', 10),
            numberOfHotels: parseInt(queryParams.get('numberOfHotels') || '0', 10),
            numberOfInclusions: parseInt(queryParams.get('numberOfInclusions') || '1', 10),
            numberOfExclusions: parseInt(queryParams.get('numberOfExclusions') || '1', 10),
            tripAdvisorName: queryParams.get('tripAdvisorName') || '',
            tripAdvisorNumber: queryParams.get('tripAdvisorNumber') || '',
            cabs: queryParams.get('cabs') || '',
            flights: queryParams.get('flights') || '',
            totalTrips: parseInt(queryParams.get('totalTrips') || '0', 10),
            totalReviews: parseInt(queryParams.get('totalReviews') || '0', 10),
            quotePrice: parseInt(queryParams.get('quotePrice') || '0', 10),
            pricePerPerson: parseInt(queryParams.get('pricePerPerson') || '0', 10),
            days,
            hotels,
            inclusions,
            exclusions,
        });
    }, []);

    const handlePrint = useCallback(() => {
        setShowPrintButton(false);
        setTimeout(() => window.print(), 0);
        setTimeout(() => setShowPrintButton(true), 2000);
    }, []);

    return (
        <div className={`w-full flex justify-center items-center ${notoSans.className}`}>
            <div className={`max-w-[894px] w-full`}>
                <header className="bg-slate-900 text-white w-full flex p-3 justify-between">
                    <LogoFull />
                    <div className={`flex items-center gap-2`}>
                        <div
                            className={`bg-custom-clp rounded-full w-10 h-10 flex justify-center items-center text-custom-txd`}
                        >
                            <FaPhoneAlt size={16} />
                        </div>
                        <div className="">
                            <div>
                                <span className={`font-semibold text-xs`}>Call Us</span>
                            </div>
                            <div>
                                <span className={`font-semibold text-sm`}>+91 9625992025</span>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="w-full flex flex-col gap-10">
                    <div className="bg-sky-50">
                        <div className="px-5 py-5 flex flex-col gap-1 w-full">
                            <span>Dear {itineraryData?.clientName},</span>
                            <span>Greeting from Travel Trail Holidays!🌍</span>
                            <span>
                                We&lsquo;re thrilled to present you with a selection of incredible holiday packages
                                tailored just for you by Travel Trail Holidays, one of the most trusted names in
                                travel!✨
                            </span>
                            <div className='flex gap-10 items-center mt-5'>
                                <div className='flex items-center gap-2 font-semibold'>
                                    <FaSuitcase size={20}/>
                                    {itineraryData?.totalTrips}+ Trip sold
                                </div>
                                <div className='flex items-center gap-2 font-semibold'>
                                    <MdRateReview size={22}/>
                                    {itineraryData?.totalReviews}+ Reviews
                                </div>
                                <div className='flex items-center gap-1 font-semibold'>
                                    <AiFillThunderbolt size={22}/>
                                    100% Super reviews
                                </div>
                            </div>
                            <div className="mt-10 flex flex-col gap-1">
                                <span className="font-semibold text-xl">{itineraryData?.packageTitle}</span>
                                <span className="font-semibold">
                                    {itineraryData?.numberOfNights}N/{itineraryData?.numberOfDays}D
                                </span>
                            </div>
                            <div className="mt-4 text-lg flex gap-2">
                                <span className="font-semibold">Quoted price:</span>
                                <span>₹{itineraryData?.quotePrice}</span>
                            </div>
                            <div className="mt-1 text-lg flex gap-2">
                                <span className="font-semibold">Price per person:</span>
                                <span>₹{itineraryData?.pricePerPerson}</span>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 py-5">
                        <span className="text-3xl font-bold">Hotel Summary</span>
                        <div className="h-[2px] w-full bg-border mt-2"></div>
                        <div className="mt-7 flex flex-col gap-7">
                            {itineraryData?.hotels.map((hotel, index) => (
                                <div key={index}>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl font-semibold">{hotel.placeName}:</span>
                                        <span className="text-xl">{hotel.placeDescription}</span>
                                    </div>
                                    <div className="flex gap-10 items-center p-5">
                                        <FaHotel size={100} color="#FACC15" className="" />
                                        <div className="flex flex-col gap-1">
                                            <span className="text-custom-clp font-semibold text-lg">
                                                {hotel.hotelName}
                                            </span>
                                            <span className="text-lg">Room Type: {hotel.roomType}</span>
                                            <span className="text-lg">{hotel.hotelDescription}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="px-5">
                        <span className="text-3xl font-bold">Flights</span>
                        <div className="h-[2px] w-full bg-border mt-2"></div>
                        <div className="mt-3">
                            <span className="text-lg">{itineraryData?.flights}</span>
                        </div>
                    </div>
                    <div className="px-5">
                        <span className="text-3xl font-bold">Cabs</span>
                        <div className="h-[2px] w-full bg-border mt-2"></div>
                        <div className="mt-3">
                            <span className="text-lg">{itineraryData?.cabs}</span>
                        </div>
                    </div>
                    <div className="px-5">
                        <span className="text-3xl font-bold">Itinerary</span>
                        <div className="h-[2px] w-full bg-border mt-2"></div>
                        <div className="mt-7 flex flex-col gap-9">
                            {itineraryData?.days.map((day, index) => (
                                <div key={index}>
                                    <div className="flex gap-2">
                                        <span className="text-xl font-semibold min-w-[70px]">Day {index + 1}:</span>
                                        <span className="text-xl">{day.summary}</span>
                                    </div>
                                    <img
                                        src={day.imageSrc}
                                        alt=""
                                        width={1000}
                                        height={1000}
                                        className="w-full h-80 mt-2 object-cover"
                                    />
                                    <p className="mt-2">{day.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="px-5 flex gap-10">
                        <div className="w-1/2">
                            <span className="text-3xl font-bold">Inclusions</span>
                            <div className="h-[2px] w-full bg-border mt-2"></div>
                            <div className="mt-3 flex flex-col gap-2">
                                {itineraryData?.inclusions.map((inclusion, index) => (
                                    <div className="flex gap-2 items-center" key={index}>
                                        <BulletPoints icon={FaCheck} size={16} color="#22C55E" text={inclusion.value} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-1/2">
                            <span className="text-3xl font-bold">Exclusions</span>
                            <div className="h-[2px] w-full bg-border mt-2"></div>
                            <div className="mt-3 flex flex-col gap-2">
                                {itineraryData?.exclusions.map((exclusion, index) => (
                                    <div key={index} className="flex gap-2 items-center">
                                        <BulletPoints
                                            icon={RxCrossCircled}
                                            size={16}
                                            color="#EF4444"
                                            text={exclusion.value}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="px-5 mt-5">
                        <span className="text-3xl font-bold">Payment Process</span>
                        <div className="h-[2px] w-full bg-border mt-2"></div>
                        <div className="mt-3">
                            <div className="text-lg">Following mode of payments are available:</div>
                            <div className="mt-7 w-full flex gap-10 justify-between">
                                <div className="w-1/2">
                                    <span className="text-xl uppercase font-semibold">1. Pay in account</span>
                                    <div className="ml-6 flex flex-col gap-1 mt-3">
                                        <span>Bank Name: IndusInd Bank</span>
                                        <span>Account Name: Travel Trail Holidays Private Limited</span>
                                        <span>Account Number: 259625992025</span>
                                        <span>IFSC Code: INDB0000735</span>
                                        <span>Account Type: Current</span>
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <span className="text-xl uppercase font-semibold">2. Pay by UPI</span>
                                    <div className="ml-6 flex flex-col gap-1 mt-3">
                                        <span>Merchant: Travel Trail Holidays Private Limited</span>
                                        <span>UPI ID: 9625992025@upi</span>
                                        <span>UPI No: 9625992025</span>
                                        <Image src={'/upi.jpg'} alt="" width={200} height={200} />
                                        <Image src={'/pay.jpg'} alt="" width={1000000} height={1000000} quality={100} className='w-[250px]'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 py-12 flex flex-col gap-5 font-medium text-lg">
                        <span>
                            In case you&lsquo;d want to customize this quote/ itinerary or if its price doesn&lsquo;t
                            fit your budget, then kindly let the agent know about it directly at 9953276022.
                        </span>
                        <span>
                            If you need further support, please reply to this email or call us on +91{' '}
                            {itineraryData?.tripAdvisorNumber}. Your Trip Advisor is{' '}
                            <span className="font-bold">{itineraryData?.tripAdvisorName}</span>.
                        </span>
                    </div>
                </div>
                <div className="px-5 py-7 bg-gray-100">
                    <div>
                        <div>
                            <span className="text-2xl font-bold">Payment Policy:</span>
                            <div className="h-[2px] w-full bg-gray-400 mt-2"></div>
                        </div>
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="50% payment at the time of booking"
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="Remaining payment Before 7 Days check in."
                        />
                    </div>
                    <div className="mt-10">
                        <div>
                            <span className="text-2xl font-bold">Cancellation Policy:</span>
                            <div className="h-[2px] w-full bg-gray-400 mt-2"></div>
                        </div>
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="Before 30 Days from the date of commencement = 35% Cancellation Charges of Total Amount (Total trip cost)."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="Before 30-15 Days from the date of Commencement = 50% Cancellation Charges of Total Amount (Total trip cost)."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="Before 15 Days from the date of Commencement = 75% Cancellation Charges of Total Amount (Total trip cost )."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="Before 14 days or less from the date of Commencement = 100% Cancellation Charges will be applicable (Total trip cost)."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="In Case passenger is no show at the time of departure, 100% of tour cost shall be detected."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="Even If Trip is cancelled on the same day of date booking then (10% + GST) of the total trip cost will be deducted /applicable as cancellation Charges."
                        />
                    </div>
                    <div className="mt-10">
                        <div>
                            <span className="text-2xl font-bold">Child Policy:</span>
                            <div className="h-[2px] w-full bg-gray-400 mt-2"></div>
                        </div>
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="Children over 12 years or abode will be charged as adults , relevant docs need to be produced at the time of check in the hotel."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="In Case of Group travel infant will be charged the half of the adult&lsquo;s transport cost."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="Till 5-year-old FREE with no extra bed. 6-12 years 50% of the adult cost & 12 and above full charges will be applicable."
                        />
                    </div>
                    <div className="mt-10">
                        <div>
                            <span className="text-2xl font-bold">Terms & Condition:</span>
                            <div className="h-[2px] w-full bg-gray-400 mt-2"></div>
                        </div>
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="In case of unavailability in the listed hotels, arrangement for an alternate accommodation will be made in a hotel of similar standard."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="The itinerary is fixed and cannot be modified. (Itinerary will be executed as per the route not as per the day plan) Transportation shall be provided as per the itinerary and will not be at disposal."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="In case your package needs to be cancelled due to any natural calamity, weather conditions etc. Travel Trail Holidays shall strive to give you the maximum possible refund subject to the agreement made with our trade partners/vendors."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="Travel Trail Holidays reserves the right to modify the itinerary at any point due to reasons including, but not limited to: Force Majeure events, strikes, fairs, festivals, weather conditions, traffic problems, overbooking of hotels/flights, cancellation/re-routing of flights, or closure of/entry restrictions at a place of visit. While we will do our best to make suitable alternate arrangements, we will not be held liable for any refunds or compensation claims arising from this. Costs incurred due to the listed reasons will be borne by the client."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="Places mentioned for sightseeing in the itinerary may not be accessible with the vehicle assigned for your trip. Some locations may require special vehicles or permits to visit, and any associated costs will need to be borne by the traveler. Please consult with TripAdvisor before finalizing your trip."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="Weather Conditions and Costs: In case of weather conditions causing guests/clients to be stuck on the way or at sightseeing places, the cost of evacuation will be borne by the client. Additionally, costs for deviation and extension of ticket validity are not included."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="Cancellations and Disputes: For queries regarding cancellations and refunds, please refer to our Cancellation Policy. Disputes, if any, shall be subject to the exclusive jurisdiction of the courts in New Delhi."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="Additional Costs and Flight Changes: Any costs arising from natural or political strikes, calamities (e.g., landslides, roadblocks) will be borne directly by the client on the spot. In case of flight rescheduling or cancellation, changes to Travel Trail Holidays bookings cannot be amended."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="It is the responsibility of each traveler to carry a personal first aid kit during the journey. The first aid kit should include basic medical supplies such as bandages, antiseptic wipes, pain relievers, and any personal medications required. Please carry your first aid kit on your journey"
                        />
                    </div>
                    <div className="mt-10">
                        <div>
                            <span className="text-2xl font-bold">Transport Terms (if applicable):</span>
                            <div className="h-[2px] w-full bg-gray-400 mt-2"></div>
                        </div>
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="In case of any mechanical issues or road accidents involving the car during your trip, Travel Trail Holidays will provide a replacement or alternate vehicle arrangements within 5 hours from the time the incident is reported. If additional costs are incurred, they will be borne by the user."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="In case you are traveling in hilly areas, the air conditioning may not work. Additionally, if your vehicle reaches the destination of your trip after 10 PM, night charges will apply."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="Sightseeing hours are from 10 AM to 5 PM only. Exceeding these hours will incur an additional cost of INR 300 per hour."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="Any additional sightseeing not covered in the itinerary can be arranged at an extra cost. This should be discussed with the trip advisor."
                        />
                        <BulletPoints
                            icon={FaRegArrowAltCircleRight}
                            size={16}
                            color="#22C55E"
                            text="Travel Trail Holidays reserves the right to terminate your trip at any point in time if payment is delayed."
                        />
                    </div>
                </div>
                {showPrintButton && (
                    <div
                        onClick={handlePrint}
                        className="py-2 bg-custom-clp rounded font-medium text-white hover:bg-custom-clp/80 text-center my-20 cursor-pointer"
                    >
                        Print
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewItinerary;
