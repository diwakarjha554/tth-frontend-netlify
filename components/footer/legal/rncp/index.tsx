import Section from '@/components/ui/features/Section';
import Container from '@/components/ui/features/Container';
import SectionHeading from '@/components/ui/section-heading';

const Rncp = () => {
    return (
        <Section className="pt-10 pb-20">
            <Container className="md:px-10 w-full font-[500] flex flex-col gap-5">
                <SectionHeading mainHeading="Payment Policy:" />
                <div className="flex flex-col gap-5 px-3">
                    <p className="mt-1">30% payment at the time of booking</p>
                    <p>70% Payment at the Journey Time</p>
                </div>
                <div className="mt-10"></div>
                <SectionHeading mainHeading="Cancellation Policy:" />
                <div className="flex flex-col gap-5 px-3">
                    <p className="mt-1">
                        Before 30 Days from the date of commencement= 25 % Cancellation Charges of Total Amount...
                        (Total trip cost) ·
                    </p>
                    <p>
                        Before 30 - 15 Days from the date of Commencement = 40% Cancellation Charges of Total Amount....
                        (Total trip cost ) ·
                    </p>
                    <p>
                        Before 15 Days from the date of Commencement = 50% Cancellation Charges of (Total trip cost) ·
                    </p>
                    <p>
                        Before 7 days or less from the date of Commencement = Full Cancellation Charges will be
                        applicable (Total trip cost)
                    </p>
                    <p>
                        In Case passenger is no show at the time of departure, 100% of tour cost shall be detected. Even
                        If Trip is cancelled on the same day of date booking then 10%+GST of the total trip cost will be
                        deducted /applicable as cancellation Charges.
                    </p>
                </div>
                <div className="mt-10"></div>
                <SectionHeading mainHeading="Refund Policy:" />
                <div className="flex flex-col gap-5 px-3">
                    <p className="mt-1">
                        If you are elegible for refund, then the full amount will be credited to your account within 7
                        to 14 working days.
                    </p>
                </div>
            </Container>
        </Section>
    );
};

export default Rncp;
