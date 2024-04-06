import Image from "next/image";
import Head from "@/components/common/head";
import Layer from "@/components/common/layer";
import Noise from "@/components/ui/noise";

import { Inter } from "next/font/google";
import Lenis from "@/components/Lenis";

import dynamic from "next/dynamic";

const DynamicLandingPage = dynamic(
  () => import("@/components/pages/LandingPage"),
  {}
);

export default function Home() {
  return (<> 
  <Head
    title={'Hassan Anbar'}
    description={'Hassan Anbar'}
    keywords={'Hassan Anbar'}
    author={'Hassan Anbar'}
    logo="/favicon.svg"
  />
  <Lenis>
    <Layer>
      <DynamicLandingPage />
      <Noise />
    </Layer>
  </Lenis>
  </>)
}
