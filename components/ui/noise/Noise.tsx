import { twMerge } from "tailwind-merge";

const Noise = ({
  position = "fixed",
  className = "opacity-70",
}: {
  position?: "fixed" | "absolute";
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "bg-noise",
        className || "opacity-70",
        "-top-1/2 -left-1/2 -bottom-1/2 -right-1/2 bg-repeat",
        "will-change-transform-animation",
        'bg-[url("/images/noise-transparent.png")] bg-center bg-repeat',
        position == "fixed"
          ? "fixed w-[300vw] h-[300vh] visible z-bg"
          : "absolute w-[200%] h-[200%] overflow-none z-50"
      )}
    ></div>
  );
};

export default Noise;
