'use client';

import Section from '@/components/ui/features/Section';
import Container from '@/components/ui/features/Container';

const TermsCondition = () => {
    return (
        <Section className='pt-10 pb-20'>
            <Container className='md:px-10 w-full font-[500] flex flex-col gap-5'>
                <h1 className='text-3xl font-[600]'>Terms & Conditions</h1>
                <p className='mt-5'>
                    In case of unavailability in the listed hotels, arrangement for an alternate accommodation will be made in a hotel of similar standard.
                </p>
                <p>
                    The itinerary is fixed and cannot be modified. Transportation shall be provided as per the itinerary and will not be at disposal. In case your package needs to be cancelled due to any natural calamity, weather conditions etc.
                </p>
                <p>
                    Travel Trail Holidays shall strive to give you the maximum possible refund subject to the agreement made with our trade partners/vendors.
                </p>
                <p>
                    Travel Trail Holidays reserves the right to modify the itinerary at any point, due to reasons including but not limited to: Force Majeure events, strikes, fairs, festivals, weather conditions, traffic problems, overbooking of hotels / flights, cancellation / rerouting of flights, closure of /entry restrictions at a place of visit, etc. While we will do our best to make suitable alternate arrangements, we would not be held liable for any refunds/compensation claims arising out of this
                </p>
                <p>
                    Cost of deviation and cost of extension of the validity on your ticket is not included.
                    <ul>
                        <li>
                            For queries regarding cancellations and refunds, please refer to our Cancellation Policy.
                        </li>
                        <li>
                            Disputes, if any, shall be subject to the exclusive jurisdiction of the courts in New Delhi.
                        </li>
                    </ul>
                </p>
                <p>
                    Any cost arising due to natural / Politicalstrick / calamities like, landslides, road blocks etc (tobe borne by the clients directly on the spot) Child Policies : Till 6 year old FREE with no extra bed .
                </p>
                <p>
                    6-12 years 50% of the adult cost & 12 and above full charges will be applicable. Agency Contact
                </p>
            </Container>
        </Section>
    )
}

export default TermsCondition;