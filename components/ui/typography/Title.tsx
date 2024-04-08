import React, { FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { titleStyle } from "./Typography.style";

import type { TitleNames, TitlePropsExtended } from "./Typography.type";
import { validTitleElements } from "./Typography.type";

const Title: FC<TitlePropsExtended> = ({
  className,
  children,
  ...props
}) => {
  const ElementType = useMemo(() => {
    return (
      (Object.keys(props) as Array<TitleNames>).find((prop) =>
        validTitleElements.includes(prop)
      ) || "h2"
    );
  }, [props]);

  const elementProps = useMemo(() => {
    return Object.keys(props).reduce(
      (
        acc: {
          [key: string]: TitlePropsExtended[keyof TitlePropsExtended];
        },
        prop: any
      ) => {
        if (!validTitleElements.includes(prop as TitleNames)) {
          // @ts-expect-error
          acc[prop] = props[prop as keyof TitlePropsExtended];
        }
        return acc;
      },
      {}
    );
  }, [props]);

  return React.createElement(
    ElementType,
    {
      className,
      ...elementProps
    },
    children
  );
};

export default Title;
