import { useMemo, useEffect, useState } from "react";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["cyrillic"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  const font = useMemo(() => montserrat.variable, [montserrat]);
  const [isReadyFont, setIsReadyFont] = useState(false);
  useEffect(() => {
    document.documentElement.style.setProperty("--font-montserrat", font);
    document.body.classList.add(font);
    const time = setTimeout(() => {
      setIsReadyFont(true);
    }, 1000);
    return () => {
      setIsReadyFont(false);
      clearTimeout(time);
    };
  }, [font]);

  if (!font) return null;

  return (
    <>
      <main className="app-container">
        <Component {...pageProps} />
      </main>
    </>
  );
}
