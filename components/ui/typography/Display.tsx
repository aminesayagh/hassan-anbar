import { FC, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { DisplayPropsExtended } from './Typography.type';
import { displayStyle } from './Typography.style'

const Display: FC<DisplayPropsExtended> = ({ size, weight, children, className, ...props }) => {
    const classes = useMemo(() => {
        return twMerge(
            displayStyle({
                weight,
                size
            }),
            className
        );
    }, [size, weight, className]);
    
    return <h1
        {...{
            className: classes,
            ...props
        }}
    >{children}</h1>
}

export default Display;