import { FocusRing } from "react-aria";
import { Button } from "react-aria-components";
import { ButtonProps } from "./Button.type";
import { twMerge } from "tailwind-merge";
import { textClassNames } from "@/components/ui/typography";
import React, { forwardRef, useMemo, memo } from "react";

const ButtonUi = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      icon,
      iconRight,
      size = "auto",
      full,
      weight,
      name,
      degree = "0",
      exchange,
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
          textClassNames({ weight, size, degree, exchange }),
          typeof className == "string" ? className : ""
        ),
      [size, full, weight, degree, exchange, className]
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
