import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import React from 'react';
import ThemeBox from './theme-box';
import { FaFaceAngry } from 'react-icons/fa6';

const SelectTheme = () => {
  return (
    <Section className='bg-gray-50 dark:bg-[#111111] py-20'>
      <Container className='w-full'>
        <div>
          <h1 className='font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text w-fit'>
            Select Theme
          </h1>
          <h1 className='font-semibold text-lg'>
            Browse packages through THEMES
          </h1>
        </div>
        <div className='mt-10 flex flex-wrap gap-5 justify-center'>
          <ThemeBox icon={FaFaceAngry} size={32}/>
          <ThemeBox icon={FaFaceAngry} size={32}/>
          <ThemeBox icon={FaFaceAngry} size={32}/>
          <ThemeBox icon={FaFaceAngry} size={32}/>
          <ThemeBox icon={FaFaceAngry} size={32}/>
          <ThemeBox icon={FaFaceAngry} size={32}/>
          <ThemeBox icon={FaFaceAngry} size={32}/>
          <ThemeBox icon={FaFaceAngry} size={32}/>
          <ThemeBox icon={FaFaceAngry} size={32}/>
          <ThemeBox icon={FaFaceAngry} size={32}/>
          <ThemeBox icon={FaFaceAngry} size={32}/>
          <ThemeBox icon={FaFaceAngry} size={32}/>
          <ThemeBox icon={FaFaceAngry} size={32}/>
          <ThemeBox icon={FaFaceAngry} size={32}/>
          <ThemeBox icon={FaFaceAngry} size={32}/>
          <ThemeBox icon={FaFaceAngry} size={32}/>
        </div>
      </Container>
    </Section>
  )
}

export default SelectTheme;