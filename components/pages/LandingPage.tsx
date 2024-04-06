import Container from '@/components/ui/container';
import React from 'react';
import Intro from './section/1-intro';

const LandingPage = () => (<>
    <Container as='section' size='lg' id='intro' >
        <Intro />
    </Container>
</>)

export default LandingPage;