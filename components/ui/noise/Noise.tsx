import { twMerge } from "tailwind-merge";

const Noise = ({
}: {
}) => {
  return (
    <div
      className={twMerge(
        "bg-noise",
        "opacity-15",
        "top-0 left-0 bottom-0 right-0 bg-repeat fixed z-0",
        'bg-[url("/images/background-blur-effect.png")] bg-center bg-repeat',
      )}
    ></div>
  );
};

export default Noise;
