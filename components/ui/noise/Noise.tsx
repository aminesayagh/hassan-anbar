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
        "opacity-15",
        "top-0 left-0 bottom-0 right-0 bg-repeat fixed",
        'bg-[url("/images/background-blur-effect.png")] bg-center bg-repeat',
      )}
    ></div>
  );
};

export default Noise;
