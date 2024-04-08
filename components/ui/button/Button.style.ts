import { twMerge } from "tailwind-merge";
import { textStyle } from "@/components/ui/typography/Typography.style";

export const buttonUnderlineStyle = twMerge(textStyle({
    size: 'sm',
    weight: 'bold',
    degree: '1'
}), 'uppercase whitespace-nowrap-important tracking-widest border-b-2 py-1');