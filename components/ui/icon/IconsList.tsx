import { SVGAttributes } from "react";
import { IconArrowUpRight } from "@tabler/icons-react";
export interface IconProps extends SVGAttributes<SVGElement> {
    color?: string;
    size?: number | string;
}

const ListIconComponents = {
    'IconArrowUpRight': (props: IconProps) => <IconArrowUpRight {...props} />,
} as const;

export type IconNames = keyof typeof ListIconComponents;
// const IconNamesValues = Object.keys(ListIconComponents) as IconNames[];

export default ListIconComponents as { [key in IconNames]: (props: IconProps) => JSX.Element };