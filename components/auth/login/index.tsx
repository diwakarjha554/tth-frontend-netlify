import Container from '@/components/ui/features/Container';
import Section from '@/components/ui/features/Section';
import Link from 'next/link';
import React from 'react';

const Login = () => {
    return (
        <Section>
            <Container>
                <Link href={'/auth/signup'}>signup</Link>
            </Container>
        </Section>
    );
};

export default Login;
