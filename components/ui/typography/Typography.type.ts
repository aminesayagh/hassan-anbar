import React from 'react';
import { LinkProps } from 'next/link';

import { DisplayStyleProps, TitleStyleProps, LinkStyleProps } from './Typography.style';

export type DisplayPropsExtended = DisplayStyleProps & {
    children: React.ReactNode | string;
    className?: string;
    style?: React.CSSProperties;
}

type TitleElement = {
    h1: true
} | {
    h2: true
} | {
    h3: true
} | {
    h4: true
} | {
    h5: true
} | {
    h6: true
}

export const validTitleElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type TitleNames = typeof validTitleElements[number];

export type TitlePropsExtended = TitleElement & TitleStyleProps & {
    children: React.ReactNode | string;
    className?: string;
    style?: React.CSSProperties;
    suppressHydrationWarning?: boolean;
}

export const validTextElements = ['p', 'span', 'small', 'strong', 'em', 'li', 'div'] as const;
export type TextNames = typeof validTextElements[number];

type TextElement = { 
    p: true
} | {
    span: true
} | {
    small: true
} | {
    strong: true
} | {
    em: true
} | {
    li: true
} | {
    div: true
};

export type TextPropsExtended = TextElement & {
    children: React.ReactNode | string;
    className?: string;
    style?: React.CSSProperties;
    suppressHydrationWarning?: boolean;
}

export type LinkPropsExtended = LinkProps & {
    children: React.ReactNode | React.ReactNode[] | string;
    className?: string;
    animation?: 'animationHover';
}