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
        twMerge("flex flex-row items-center justify-center gap-2 select-none", className) as string
      }
      {...props}
    >
      <Image
        priority
        className="w-16 sm:w-[4.6rem] 4xl:w-[4rem]"
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </Link>
  );
};

export default Logo;
