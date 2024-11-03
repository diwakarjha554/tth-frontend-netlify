import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import UpiDetails from './upi-details';

const PaymentUpi = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
        <div className={`flex flex-col gap-5`}>
            <AccordionItem value="item-1" className={`border-none`}>
                <AccordionTrigger className={`hover:no-underline bg-border px-5 rounded-md`}>
                    Scan & Pay
                </AccordionTrigger>
                <AccordionContent>
                    <UpiDetails />
                </AccordionContent>
            </AccordionItem>
        </div>
    </Accordion>
  )
}

export default PaymentUpi;