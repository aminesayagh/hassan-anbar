import { NextSeo } from 'next-seo';

type SeoProps = {
    title: string,
    metaKeywords: string, 
    metaDesc: string,
    metaRobotsNoindex: string, 
    metaRobotsNofollow: string, 
    focuskw: string, 
    opengraphImage: { 
        altText: string, 
        link: string,
        mediaDetails: { 
            height: number, 
            width: number 
        }
    },
    favicon: string
};


const Head = ({
    title,
    metaDesc,
    metaKeywords,
    focuskw,
    metaRobotsNoindex,
    metaRobotsNofollow,
    opengraphImage,
    favicon
}: SeoProps) => {
    const robotsContent = `${metaRobotsNoindex}, ${metaRobotsNofollow}`;
    
    return (
        <NextSeo
            title={title}
            description={metaDesc}
            additionalMetaTags={[
                { name: 'keywords', content: metaKeywords },
                { name: 'author', content: focuskw },
                { name: 'robots', content: robotsContent },
                { name: 'googlebot', content: robotsContent },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            ]}
            additionalLinkTags={[
                { rel: 'icon', href: favicon },
                { rel: 'apple-touch-icon', href: favicon, sizes: '180x180' },
            ]}
            openGraph={{
                type: 'website',
                url: 'https://www.masayagh.com',
                title,
                description: metaDesc,
                site_name: title,
                images: [
                    {
                        url: opengraphImage.link || '',
                        width: opengraphImage.mediaDetails?.width,
                        height: opengraphImage.mediaDetails?.height,
                        alt: opengraphImage.altText,
                    },
                ],
            }}
        />
    );
};

export default Head;
