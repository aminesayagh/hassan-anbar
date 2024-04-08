import { FocusRing } from "react-aria";
import { Button } from "react-aria-components";
import { ButtonProps } from "./Button.type";
import { twMerge } from "tailwind-merge";
import React, { forwardRef, useMemo, memo } from "react";
import { textStyle, TextStyleProps } from "../typography/Typography.style";
import { cx } from "class-variance-authority";

export interface ButtonPropsExtended extends TextStyleProps {}
export const buttonStyle = ({ weight, size, degree }: ButtonPropsExtended) => cx([
  textStyle({
    weight,
    size,
    degree
  })
]);

const ButtonUi = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      icon,
      iconRight,
      full,
      name,
      className,
      ...props
    },
    ref
  ) => {
    const buttonClasses = useMemo(
      () =>
        twMerge(
          "touch-none select-none focus:outline-none",
          "gap-2 flex flex-row flex-nowrap self-center items-center justify-center",
          "font-sans font-bold",
          "text-clip whitespace-nowrap overflow-hidden",
          "align-middle",
          full ? "w-full" : "",
          typeof className == "string" ? className : ""
        ),
      [full, className]
    );

    return (
      <FocusRing>
        <Button name={name} ref={ref} className={buttonClasses} {...props}>
          {children}
        </Button>
      </FocusRing>
    );
  }
);

ButtonUi.displayName = "ButtonUi"; // Add display name

export default memo(ButtonUi);
