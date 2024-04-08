
import { VariantProps, cva, cx } from 'class-variance-authority';
import Style from './Typography.module.scss';

const textDefault = 'inline-block align-middle';
const fontFamilyTitle = 'font-sans';
const fontFamilyText = 'font-sans';

export type DisplayStyleProps = VariantProps<typeof displayStyle>;
export const displayStyle = cva([textDefault, fontFamilyTitle, 'text-content-100',Style['display']], {
    variants: {
        weight: {
            bold: 'font-black',
            semibold: 'font-bold',
            medium: 'font-regular',
        },
        size: {
            xl: Style['display_xl'],
            lg: Style['display_lg'],
            md: Style['display_md'],
        },
    },
    defaultVariants: {
        weight: 'bold',
        size: 'xl'
    }
})

export type TitleStyleProps = VariantProps<typeof titleStyle>;
export const titleStyle = cva([textDefault, fontFamilyTitle, Style['title']], {
    variants: {
        weight: {
            bold: 'font-extrabold',
            semibold: 'font-bold',
            medium: 'font-medium',
        },
        size: {
            h1: Style['title_h1'],
            h2: Style['title_h2'],
            h3: Style['title_h3'],
            h4: Style['title_h4'],
            h5: Style['title_h5'],
            h6: Style['title_h6'],
        },
        degree: {
            '1': 'text-content-100',
            '2': 'text-content-200',
            '3': 'text-content-300',
            '4': 'text-content-400',
        }
    },
    defaultVariants: {
        weight: 'bold',
        size: 'h2',
        degree: '2'
    }
})

export type TextStyleProps = VariantProps<typeof textStyle>;
export const textStyle = cva([textDefault, fontFamilyText, Style['text']], {
    variants: {
        weight: {
            bold: 'font-extrabold',
            semibold: 'font-semibold',
            medium: 'font-medium',
        },
        degree: {
            '1': 'text-content-100',
            '2': 'text-content-200',
            '3': 'text-content-300',
            '4': 'text-content-400',
        },
        size: {
            'xl': Style['text_xl'],
            'lg': Style['text_lg'],
            'md': Style['text_md'],
            'sm': Style['text_sm'],
            'xs': Style['text_xs'],
            'xxs': Style['text_xxs'],
            'auto': Style['text_auto'],
        }
    },
    defaultVariants: {
        weight: 'medium',
        degree: '2',
        size: 'sm'
    }
});

export interface LinkStyleProps extends TextStyleProps {}
export const linkStyle = ({ weight = 'semibold', size = 'sm', degree = '2' }: LinkStyleProps) => cx([
    textStyle({ weight, size, degree })
]);