import { useEffect, useState } from "react";
import Head from "@/components/common/head";
import Layer from "@/components/common/layer";
import Noise from "@/components/ui/noise";
import { GetPageContentSchema } from "@/helpers/zod";
import { z } from "zod";
import Lenis from "@/components/Lenis";

import dynamic from "next/dynamic";
import { useGetPageContentQuery } from '@/types/generated/graphql'

if (process.env.NODE_ENV === "development") {
  import("@apollo/client/dev").then(({ loadDevMessages, loadErrorMessages }) => {
    loadDevMessages();
    loadErrorMessages();
  });
}


const DynamicLandingPage = dynamic(
  () => import("@/components/pages/LandingPage"),
  {}
);

type PageContentType = z.infer<typeof GetPageContentSchema>;

function useValidGetContentQuery() {
  const { data: _data, error, loading } = useGetPageContentQuery();
  const [data, setValidatedData] = useState<PageContentType | null>(null);
  const [validationError, setValidationError] = useState<z.ZodError<any> | null>(null);

  useEffect(() => {
    if (_data && !error) {
      try {
        // Parse the data using the Zod schema
        const result = GetPageContentSchema.parse(_data);
        console.log(result);
        setValidatedData(result);
        setValidationError(null);
      } catch (e) {
        if (e instanceof z.ZodError) {
          setValidationError(e);
        }
      }
    }
  }, [_data, error]);

  return { data, error: error || validationError, loading };
}

export default function Home() {
  const { data, error, loading } = useValidGetContentQuery();
  console.log('data ',data);
  if (loading) {
    return null;
  }
  if (error) {
    console.error(error);
    return <div>Error</div>;
  }
  if (!data) {
    return <div>No data found</div>;
  }
  console.log('data ',data);
  const { seo } = data.page;
  const { siteFaviconUrl: favicon } = data.generalSettings;
  return (
    <>
      <Head
        favicon={favicon}
        title={seo.title}
        metaDesc={seo?.metaDesc}
        metaKeywords={seo?.metaKeywords}
        focuskw={seo?.focuskw}
        metaRobotsNoindex={seo?.metaRobotsNoindex}
        metaRobotsNofollow={seo?.metaRobotsNofollow}
        opengraphImage={seo?.opengraphImage}

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