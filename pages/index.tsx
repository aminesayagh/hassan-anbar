import Image from "next/image";
import Head from "@/components/common/head";
import Layer from "@/components/common/layer";
import Noise from "@/components/ui/noise";

import { Inter } from "next/font/google";
import Lenis from "@/components/Lenis";
import { Page } from "@/types/type";

import dynamic from "next/dynamic";
import { gql } from "@apollo/client";
import { apolloClient } from '../lib/apolloClient';

const DynamicLandingPage = dynamic(
  () => import("@/components/pages/LandingPage"),
  {}
);

const GET_PAGE_CONTENT = gql`
  query GetPageContent {
    page(id: "home", idType: URI) {
      title
      seo {
        title
        metaDesc
        metaRobotsNoindex
        metaRobotsNofollow
        focuskw
      }
      content
      blocks {
        name
        ... on CoreParagraphBlock {
          saveContent
          attributesJSON
        }
        ... on CoreHeadingBlock {
          saveContent
          attributesJSON
        }
        ... on CoreButtonBlock {
          attributesJSON
          saveContent
        }
        ... on CoreImageBlock {
          attributesJSON
          saveContent
          name
        }
      }
    }
  }
`;

export default function Home({ page }: {
  page: Page;
}) {
  console.log(page);
  return (
    <>
      <Head
        title={"Hassan Anbar"}
        description={"Hassan Anbar"}
        keywords={"Hassan Anbar"}
        author={"Hassan Anbar"}
        logo="/favicon.svg"
      />
      <Lenis>
        <Layer>
          <DynamicLandingPage />
          <Noise />
        </Layer>
      </Lenis>
    </>
  );
}
export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: GET_PAGE_CONTENT,
  });

  return {
    props: {
      page: data.page,
    },
  };
}
