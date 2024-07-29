import PackageCard from '@/components/packages/package-card';
import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import React from 'react'

const HomePackages = () => {
  return (
    <Section className='py-20'>
        <Container className='w-full'>
            <div className='w-full flex flex-col items-center gap-1 text-center'>
                <h1 className='font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text w-fit text-lg'>
                    Featured tours
                </h1>
                <h1 className='font-semibold text-xl'>
                    Most Favorite Tour Packages
                </h1>
            </div>
            <div className='mt-10 flex gap-5 justify-center flex-wrap'>
                <PackageCard />
                <PackageCard />
                <PackageCard />
                <PackageCard />
                <PackageCard />
                <PackageCard />
                <PackageCard />
                <PackageCard />
            </div>
        </Container>
    </Section>
  )
}

export default HomePackages;