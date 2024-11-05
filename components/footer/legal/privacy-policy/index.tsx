'use client';

import Section from '@/components/ui/features/Section';
import Container from '@/components/ui/features/Container';
import SectionHeading from '@/components/ui/section-heading';

const Privacy = () => {
    return (
        <Section className="pt-10 pb-20">
            <Container className="md:px-10 w-full font-[500]">
                <SectionHeading mainHeading="Privacy Policy" />
                <div className="mt-5 px-3 flex flex-col gap-3">
                    <p>
                        Travel Trail Holidays respects your privacy. This policy explains what information we collect
                        how we use it and when we share it.
                    </p>
                    <p>
                        We collect information you provide such as name contact details passport information dietary
                        requirements and emergency contact information. This is used to process your booking provide
                        travel documentation and ensure a smooth travel experience.
                    </p>
                    <p>
                        We may also collect information from your use of our website such as browsing history and search
                        preferences. This is used to improve our website and personalize your experience.
                    </p>
                    <p>
                        We will never sell or share your information with third parties for marketing purposes. We may
                        share your information with trusted partners who assist us in delivering your tour such as
                        airlines hotels and activity providers. These partners will only use your information for the
                        purpose of fulfilling your booking.
                    </p>
                    <p>
                        We take appropriate security measures to protect your information. We use secure servers and
                        encryption technology.
                    </p>
                    <p>
                        You have the right to access and update your information. You can also opt out of receiving
                        marketing communications from us.
                    </p>
                    <p>If you have any questions about this privacy policy please contact us.</p>
                </div>
            </Container>
        </Section>
    );
};

export default Privacy;
