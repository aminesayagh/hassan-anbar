import { FC, useMemo } from 'react';
import { LinkPropsExtended } from './Typography.type';
import { twMerge } from 'tailwind-merge';
import LinkNext from 'next/link';
import { textClassNames } from './Typography.style';

const Link: FC<LinkPropsExtended> = ({ weight, size = 'sm', className, animation, children, href, degree = '2', ...props }) => {
    const classNameExtended = useMemo(() => textClassNames({ weight, size, degree }), [weight, size, className, degree]);
    return <LinkNext href={href} className={twMerge(
        classNameExtended, 'remove_outline', className
    )} {...props}>{children}</LinkNext>
}

export default Link;