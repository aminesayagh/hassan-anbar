import Head from "@/components/common/head";
import Layer from "@/components/common/layer";
import Noise from "@/components/ui/noise";
import Lenis from "@/components/Lenis";

import dynamic from "next/dynamic";
import useValidGetContentQuery from "@/hook/useValidGetContentQuery";

if (process.env.NODE_ENV === "development") {
  import("@apollo/client/dev").then(
    ({ loadDevMessages, loadErrorMessages }) => {
      loadDevMessages();
      loadErrorMessages();
    }
  );
}

const DynamicLandingPage = dynamic(
  () => import("@/components/pages/LandingPage"),
  {}
);


export default function Home() {
  const { data, error, loading } = useValidGetContentQuery();
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

  const { seo } = data.page;
  const favicon = data.media?.nodes.find(n => n.id === 'cG9zdDoxOA==');
  if (!favicon) {
    console.error('Favicon not found');
    return null;
  }
  return (
    <>
      <Head
        favicon={favicon?.sourceUrl}
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