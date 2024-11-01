import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FaqContent = () => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className="hover:no-underline text-xl font-medium">
                    What makes Travel Trail Holidays special among other travel companies ?
                </AccordionTrigger>
                <AccordionContent className="text-base text-neutral-700 dark:text-neutral-300">
                    At Travel Trail Holidays, we ensure complete transparency and reliability by managing every aspect
                    of your trip ourselves. Our dedicated in-house operations team meticulously crafts each journey,
                    setting us apart.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger className="hover:no-underline text-xl font-medium">
                    How do I book a package from Travel Trail Holidays?
                </AccordionTrigger>
                <AccordionContent className="text-base text-neutral-700 dark:text-neutral-300">
                    Booking a travel package with us is effortless! Simply visit our website to submit a travel inquiry
                    or DM us on social media. Our dedicated team will quickly provide you with all the information and
                    guidance you need.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger className="hover:no-underline text-xl font-medium">
                    Is Travel Trail Holidays safe for solo female travelers?
                </AccordionTrigger>
                <AccordionContent className="text-base text-neutral-700 dark:text-neutral-300">
                    At Travel Trail Holidays, safety is our top priority. We take extra measures to ensure the comfort
                    and security of solo female travelers. Our Team Captains receive specialized training to provide a
                    seamless and secure experience, with a strong focus on women&apos;s safety.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default FaqContent;
