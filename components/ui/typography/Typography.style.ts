
import { cva } from 'class-variance-authority';

const textDefault = 'inline-block align-middle';
const fontFamilyTitle = 'font-sans';
const fontFamilyText = 'font-sans';


export const displayStyle = cva([textDefault, fontFamilyTitle], {
    variants: {
        weight: {
            bold: 'font-black',
            semibold: 'font-bold',
            medium: 'font-regular',
        }
    },
    defaultVariants: {
        weight: 'bold'
    }
})

export const titleStyle = cva([textDefault, fontFamilyTitle], {
    variants: {
        weight: {
            bold: 'font-extrabold',
            semibold: 'font-bold',
            medium: 'font-medium',
        }
    },
    defaultVariants: {
        weight: 'bold'
    }
})

export const textStyle = cva([textDefault, fontFamilyText], {
    variants: {
        weight: {
            bold: 'font-black',
            semibold: 'font-semibold',
            medium: 'font-medium',
        },
        degree: {
            '1': 'text-content-100',
            '2': 'text-content-200',
            '3': 'text-content-300',
            '4': 'text-content-400',
        }
    },
    defaultVariants: {
        weight: 'medium',
        degree: '2'
    }
})
import { TextPropsType } from './Typography.type';
import { twMerge } from 'tailwind-merge';
import Style from './Typography.module.scss';

export const textClassNames = ({ weight, size, degree }: TextPropsType) => {
    return twMerge(
        textStyle({
            weight,
            degree
        }),
        Style[`text_${size}`],
        Style['text'],
    )
}