import { FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { DisplayPropsExtended } from "./Typography.type";

const Display: FC<DisplayPropsExtended> = ({
  children,
  className,
  ...props
}) => (
  <h1
    {...{
      className,
      ...props,
    }}
  >
    {children}
  </h1>
);

export default Display;
