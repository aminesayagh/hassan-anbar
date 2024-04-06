import { FC, useMemo } from 'react';
import { LinkPropsExtended } from './Typography.type';
import { twMerge } from 'tailwind-merge';
import LinkNext from 'next/link';
import { textClassNames } from './Typography.style';

const Link: FC<LinkPropsExtended> = ({ weight, degree = '3', size, exchange, className, animation, children, href, ...props }) => {
    const classNameExtended = useMemo(() => {return (size && weight) ? textClassNames({ weight, size, degree, exchange }) : className}, [weight, size, degree, exchange, className]);
    return <LinkNext href={href} className={twMerge(
        classNameExtended, 'remove_outline', className
    )} {...props}>{children}</LinkNext>
}

export default Link;