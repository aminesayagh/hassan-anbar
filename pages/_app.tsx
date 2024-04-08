import { useMemo, useEffect, useState } from "react";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../lib/apolloClient';

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["cyrillic"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const font = montserrat.variable;
    document.documentElement.style.setProperty("--font-montserrat", font);
    document.body.classList.add(font);
  }, []);
  if(montserrat.variable === undefined) {
    return null;
  }
  return (
    <>
    <ApolloProvider client={apolloClient}>
      <main className="app-container">
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
    </>
  );
}
