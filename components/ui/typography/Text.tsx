import React, { FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import {
  TextNames,
  TextPropsExtended,
  validTextElements,
} from "./Typography.type";

const Text: FC<TextPropsExtended> = ({
  className,
  children,
  ...props
}) => {
  const ElementType = useMemo(() => {
    return (
      (Object.keys(props) as Array<TextNames>).find((prop) =>
        validTextElements.includes(prop)
      ) || "p"
    );
  }, [props]);

  const elmentProps = useMemo(() => {
    return Object.keys(props).reduce(
      (
        acc: {
          [key: string]: TextPropsExtended[keyof TextPropsExtended];
        },
        prop: any
      ) => {
        if (!validTextElements.includes(prop as TextNames)) {
          // @ts-expect-error
          acc[prop] = props[prop as keyof TextPropsExtended];
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
      ...elmentProps,
    },
    children
  );
};

export default Text;
