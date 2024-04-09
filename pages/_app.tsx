import { useMemo, useEffect, useState } from "react";
import { useRef } from "react";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../lib/apolloClient';

import { Montserrat } from "next/font/google";
import { gsap} from '@/utils/gsap';

const montserrat = Montserrat({
  subsets: ["cyrillic"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  let app = useRef(null);
  useEffect(() => {
    const font = montserrat.variable;
    document.documentElement.style.setProperty("--font-montserrat", font);
    document.body.classList.add(font);
  }, []);

  useEffect(() => {
    gsap.config({
      nullTargetWarn: false,
    });
    let ctx = gsap.context((self) => {
      gsap.fromTo(app, {
        autoAlpha: 0,
        visibility: "hidden",
        delay: 1,
      }, {
        autoAlpha: 1,
        visibility: "visible",
        duration: 1,
      });
    }, app);
    return () => {
      ctx.revert();
    };
  }, [app]);
  if (montserrat.variable === undefined) {
    return null;
  }
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <main
          ref={(el) => {
            // @ts-ignore
            app = el;
          }} className="app_container">
          <Component {...pageProps} />
        </main>

        <style jsx>{`
        .app_container {
          visibility: hidden;
        }
      `}</style>
      </ApolloProvider>

    </>
  );
}
