import Link, { LinkProps } from "next/link";

import Image from "next/image";

import { twMerge } from "tailwind-merge";

interface LogoProps extends Omit<LinkProps, "size" | "degree" | "children"> {
  alt: string;
  height: number;
  src: string;
  width: number;
  className?: string;
}
const Logo = ({ alt, src, height, width, className, ...props }: LogoProps) => {
  return (
    <Link
      className={
        twMerge("flex flex-row items-center justify-center gap-2", className) as string
      }
      {...props}
    >
      <Image
        priority
        className="w-12 xxs:w-[4.6rem]"
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </Link>
  );
};

export default Logo;
