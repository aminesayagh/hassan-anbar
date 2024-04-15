import Container from '@/components/ui/container';
import React from 'react';
import Intro from './section/1-intro';
import Noise from "@/components/ui/noise";

const LandingPage = () => (<>
        <Intro />
        <div className='w-screen overflow-hidden h-screen bg-body relative body-background z-[110]'>
                <Noise position='absolute' />
        </div>
</>)

export default LandingPage;