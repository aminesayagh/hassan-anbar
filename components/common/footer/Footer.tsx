import React, { ElementRef, useRef, useEffect, useCallback } from 'react';

import { memo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useIsomorphicLayoutEffect } from 'react-use';

import Link from '@/components/ui/typography/Link';
import Button from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import _ from 'lodash';

import Text from '@/components/ui/typography/Text';
import { useEventListener } from '@/hook/useEventListener';
import { useLenis } from '@/lib/Lenis';
import { textStyle } from '@/components/ui/typography/Typography.style';



const BASE_LOCALE_SOCIAL = 'socialNetwork';

const ICON_SIZE_CLASS_NAME = 'w-5 h-5 lg:w-6 lg:h-6';

const FollowUs = () => {
    const ref = useRef<ElementRef<'div'>>(null);
    

    return (
        <div ref={ref} className='flex flex-row justify-end items-center gap-4'>
            <ul className='flex flex-row gap-8 items-center'>
            </ul>
            <span className='overflow-hidden flex'>
                <Text p className={twMerge('fallow-button-gsap whitespace-nowrap-important', textStyle({
                    degree: '3',
                    weight: 'semibold',
                    size: 'sm'
                }))} >
                    footer.socialNetwork
                </Text>
            </span>
            {/* <Icon name='IconShare' size='24' className={twMerge('stroke-gray-400', ICON_SIZE_CLASS_NAME)} /> */}
        </div>
    )
}

// const FollowUs = memo(FollowUs);

const TextAnimated = ({ lang, phrase, className, ...props }: { lang: string,phrase: string } & Omit<React.ComponentProps<typeof Text>, 'div' | 'children'>) => {
    const container = useRef<ElementRef<'div'>>(null);
    const refs = useRef<ElementRef<'div'>[]>([]);
    const [body, setBody] = useState<React.JSX.Element[] | null>(null);

    useEffect(() => {
        setBody(null);
        const splitWords = _.map(phrase.split(' '), (word, index) => {
            return <div key={index} className='overflow-y-animate py-px' >
                <div ref={(ref) => {
                    if (!ref) return;
                    refs.current[index] = ref;
                }} className='word-gsap will-change-transform-animation'>
                    {word}
                </div>
            </div>
        });
        setBody(splitWords);
    }, [phrase, lang]);

    return <span ref={container} ><Text div className={twMerge('flex flex-row flex-wrap', className)} {...props}>
        {
            body ? body.map((word, index) => <React.Fragment key={index}>{word} </React.Fragment>) : null
        }
    </Text></span>
}



const Footer = () => {
    const lenis = useLenis();

    const goToTop = useCallback(() => {
        lenis && lenis.scrollTo(0);
    }, [lenis]);

    return (<>
        <div className={twMerge(
                'max-w-[16rem] xxs:w-8/12 xs:max-w-[46vw] sm:max-w-[40vw] md:max-w-[32vw] mdl:max-w-[30vw] xl:max-w-[20vw] 2xl:max-w-[28vw] 3xl:max-w-[22rem]'
        )} >
            <TextAnimated lang={'fr'} className={twMerge('uppercase max-w-xs justify-start gap-x-2', textStyle({
                degree: '3',
                weight: 'medium',
                size: 'md'
            }))} phrase={'footer.state'} />
        </div>
        <div className={twMerge('flex flex-row flex-wrap sm:flex-nowrap justify-between', 'gap-y-4', 'pb-10 pt-6')}>
            <div className={twMerge('flex flex-row flex-1', 'order-2 sm:order-1')} >
            </div>
            <div className='flex flex-row flex-none grow-0 justify-start sm:justify-center items-center  order-1 sm:order-2'>
                <Text p className={twMerge('uppercase', textStyle({
                    degree: '3',
                    weight: 'semibold',
                    size: 'sm'
                }))}>
                    footer.name
                </Text>
                <Text p className={twMerge('ml-2', textStyle({
                    degree: '3',
                    weight: 'semibold',
                    size: 'sm'
                }))} >
                    footer.copy
                </Text>
            </div>
            <div className='order-3 flex-1'>
                <FollowUs />
            </div>
        </div>
    </>)
}

export default memo(Footer);