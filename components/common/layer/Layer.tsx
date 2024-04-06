import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Container from '@/components/ui/container';
import { twMerge } from 'tailwind-merge';

const HeaderDynamic = dynamic(() => import('@/components/common/header'), {});
const FooterDynamic = dynamic(() => import('@/components/common/footer'), {});

const Layer = ({ children }: {
    children: React.ReactElement | React.ReactElement[];
}) => {


    return <>
        <HeaderDynamic />
        {children}
        <Container data-scroll-section as='footer' size='lg' id='footer' className={twMerge('flex flex-col gap-8 xl:gap-12')}>
            <FooterDynamic />
        </Container>
    </>
}

export default Layer;