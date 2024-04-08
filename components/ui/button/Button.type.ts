
import { ButtonProps as AriaButtonProps } from 'react-aria-components';
import React from 'react';

interface PropsIcon {
    icon?: React.ReactNode;
    iconRight?: React.ReactNode,
}

export interface ButtonProps extends PropsIcon, AriaButtonProps {
    title?: string;
    full?: boolean;
}