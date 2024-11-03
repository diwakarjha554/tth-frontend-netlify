'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PaymentForm from "./payment-form";


export default function PaymentGateway() {

    
    return (
        <Accordion type="single" collapsible className="w-full">
            <div className={`flex flex-col gap-5`}>
                <AccordionItem value="item-1" className={`border-none`}>
                    <AccordionTrigger className={`hover:no-underline bg-border px-5 rounded-md`}>
                        Payment Gateway
                    </AccordionTrigger>
                    <AccordionContent>
                        <PaymentForm />
                    </AccordionContent>
                </AccordionItem>
            </div>
        </Accordion>
    )
}
