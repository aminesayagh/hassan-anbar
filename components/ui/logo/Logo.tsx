import Link, { LinkProps } from "next/link";

import Image from "next/image";

import { twMerge } from "tailwind-merge";

interface LogoProps extends Omit<LinkProps, "size" | "degree" | "children"> {
  alt: string;
  height: number;
  src: string;
  width: number;
}
const Logo = ({ alt, src, height, width, ...props }: LogoProps) => {
  return (
    <Link
      className={
        twMerge("flex flex-row items-center justify-center gap-2") as string
      }
      {...props}
    >
      <Image
        priority
        className="w-12 xxs:w-16"
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </Link>
  );
};

export default Logo;
