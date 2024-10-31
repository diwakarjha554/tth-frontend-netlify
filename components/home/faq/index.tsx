import Container from '@/components/ui/features/Container'
import Section from '@/components/ui/features/Section'
import SectionHeading from '@/components/ui/section-heading'
import React from 'react'
import FaqContent from './faq-content'

const Faqs = () => {
  return (
    <Section className='py-20'>
        <Container className='w-full flex flex-col gap-10'>
            <SectionHeading mainHeading='FAQ' subHeading='Most frequently asked questions' isSmallS/>
            <FaqContent />
        </Container>
    </Section>
  )
}

export default Faqs