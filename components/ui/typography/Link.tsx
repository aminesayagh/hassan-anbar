import { FC, useMemo } from "react";
import { LinkPropsExtended } from "./Typography.type";
import { twMerge } from "tailwind-merge";
import LinkNext from "next/link";

const Link: FC<LinkPropsExtended> = ({
  className,
  animation,
  children,
  href,
  ...props
}) => {
    
  return (
    <LinkNext
      href={href}
      className={twMerge("remove_outline", className)}
      {...props}
    >
      {children}
    </LinkNext>
  );
};

export default Link;