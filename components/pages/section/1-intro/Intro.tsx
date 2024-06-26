import useValidGetContentQuery from "@/hook/useValidGetContentQuery";
import Text from "@/components/ui/typography/Text";
import Display from "@/components/ui/typography/Display";
import Title from "@/components/ui/typography/Title";
import Button, { buttonUnderlineStyle } from "@/components/ui/button";
import Container, { containerStyle } from "@/components/ui/container";
import Link from '@/components/ui/typography/Link';
import {
  textStyle,
  titleStyle,
  linkStyle,
} from "@/components/ui/typography/Typography.style";
import TypeIt from "typeit-react";

import { twMerge } from "tailwind-merge";

const anchors = [
  "_section_intro_title_h1_main",
  "_section_intro_title_h5_subtitle",
  "_section_intro_image_main",
  "_section_intro_para_prove_1",
  "_section_intro_para_prove_2",
  "_section_intro_para_prove_3",
  "_section_intro_button_join",
  "_section_intro_button_action",
  "_section_intro_para_action",
  "_section_intro_button_newsletter",
  "_section_intro_button_contact",
];

const proveStyle = textStyle({
  weight: "semibold",
  size: "md",
  degree: "3",
});

const normalButtonStyle = twMerge(
  "uppercase w-auto text-right whitespace-nowrap-important tracking-wider",
  textStyle({
    size: "sm",
    weight: "bold",
    degree: "1",
  })
);

const maxWidthOfBlock = "max-w-[17.3rem] 2xl:max-w-[20rem]";

// function TextAnimatedDecoration() {
//   return (
//     <div className="relative after:absolute after:bg-neutral-400 after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
//       <span className="text-neutral-400">Text Animated Decoration</span>
//     </div>
//   );
// }

const LinkUi = ({ href, children, className }: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Link href={href} className={twMerge(className)} >
      {children}
    </Link>
  );
}

const LinkAnimatedDecoration = ({ href, children }: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <LinkUi href={href} className="relative after:absolute after:bg-neutral-400 after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
      <span className={normalButtonStyle}>

        {children}
      </span>
    </LinkUi>
  );
}

//
const Intro = () => {
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

  const {
    page: { blocks },
  } = data;
  if (!blocks) {
    return <div>No blocks found</div>;
  }

  console.log(blocks);
  const titleH1Main = blocks.find(
    (block) => block?.attributesJSON.anchor === anchors[0]
  );
  const titleH5Subtitle = blocks.find(
    (block) => block?.attributesJSON.anchor === anchors[1]
  );
  const imageMain = blocks.find(
    (block) => block?.attributesJSON.anchor === anchors[2]
  );
  const paraProve1 = blocks.find(
    (block) => block?.attributesJSON.anchor === anchors[3]
  );
  const paraProve2 = blocks.find(
    (block) => block?.attributesJSON.anchor === anchors[4]
  );
  const paraProve3 = blocks.find(
    (block) => block?.attributesJSON.anchor === anchors[5]
  );
  const buttonJoin = blocks.find(
    (block) => block?.attributesJSON.anchor === anchors[6]
  );
  const buttonAction = blocks.find(
    (block) => block?.attributesJSON.anchor === anchors[7]
  );
  const paraAction = blocks.find(
    (block) => block?.attributesJSON.anchor === anchors[8]
  );
  const buttonNewsletter = blocks.find(
    (block) => block?.attributesJSON.anchor === anchors[9]
  );
  const buttonContact = blocks.find(
    (block) => block?.attributesJSON.anchor === anchors[10]
  );
  const text =titleH1Main?.saveContent.content.split(" ");

  return (
    <Container
      as="section"
      size="lg"
      id="intro"
      className="relative sm:h-screen sm:max-h-screnn z-10"
    >
      <div
        className={twMerge(
          containerStyle({
            size: "lg",
          }),
          "absolute z-0 sm:max-h-screen w-full h-full right-0",
          "grid grid-cols-12 grid-rows-1 gap-x-4"
        )}
      >
        <div
          className={twMerge(
            "relative flex flex-col justify-end",
            "overflow-hidden xl:overflow-visible place-self-end",
            "w-full mdl:w-[84%] lg:w-[80%] xl:w-full",
            "col-start-5 col-span-8 sm:col-start-6 sm:col-span-7 mdl:col-start-5 mdl:col-span-8 xl:col-start-6 xl:col-span-7 4xl:col-start-6 4xl:col-span-7 row-start-1 row-span-4",
            "h-auto z-10"
          )}
        >
          <img
            src={imageMain?.saveContent.attributes.src}
            alt={imageMain?.saveContent.attributes.alt}
            className="w-auto h-auto max-h-screen select-none object-contain object-center"
          />
        </div>
        <div className="col-start-7 col-span-6 row-start-1 row-span-4 h-full">
          <div className="w-full h-[140%] mt-12 rounded-full bg-primary-500 opacity-50 blur-[240px]"></div>
        </div>
      </div>
      <div style={{
        zIndex: 200
      }} className="relative grid grid-cols-12 grid-rows-[repeat(6,_minmax(0,_auto))] xs:grid-rows-[repeat(5,_minmax(0,_auto))] sm:grid-rows-[repeat(4,_minmax(0,_auto))] gap-4 justify-between auto-rows-max items-start h-full pb-4 pt-20 sm:pt-16 lg:pt-28 2xl:pt-24 content-between">
        <Text
          className={twMerge(
            proveStyle,
            "col-start-1 row-start-1 col-span-6 sm:col-span-4 mdl:col-start-1 mdl:col-span-3 z-20",
            maxWidthOfBlock
          )}
          p
        >
          {paraProve1?.saveContent.content}
        </Text>
        <Text
          className={twMerge(
            proveStyle,
            "col-start-7 sn:col-start-5 mdl:col-start-4 row-start-1 col-span-6 sm:col-span-4 mdl:col-span-3 z-20",
            maxWidthOfBlock
          )}
          p
        >
          {paraProve2?.saveContent.content}
        </Text>
        <div
          className={twMerge(
            "relative flex flex-col justify-start items-start gap-1 xl:gap-2 z-20",
            // "left-0 md:left-[-10%] mdl:left-0",
            maxWidthOfBlock,
            "row-start-4 sm:row-start-1 row-span-1 sm:row-span-2",
            "col-span-9 xs:col-span-5 sm:col-span-3 mdl:col-span-2 col-start-1 sm:col-start-10 mdl:col-start-11"
          )}
        >
          <Text className={proveStyle} p>
            {paraProve3?.saveContent.content}
          </Text>
          <span>
            <LinkAnimatedDecoration href='/#'>
              {buttonJoin?.saveContent.children[0].content}
            </LinkAnimatedDecoration>
          </span>
        </div>
        <div
          className={twMerge(
            "flex flex-col",
            "gap-4 2xl:gap-6",
            "col-start-1 col-span-12 xs:col-span-10 sm:col-span-8 mdl:col-span-7 4xl:col-span-6",
            "row-start-2 row-span-1",
            "pb-2 mdl:pb-9"
          )}
        >
          <Display
            weight="bold"
            size="xl"
            className="uppercase relative -left-[0.2rem] lg:-left-[0.4rem] 4xl:-left-2"
          >
            {text[0]} <br /> {text[1]} <br />
            <TypeIt options={{
              speed: 250,
              waitUntilVisible: true,
              cursor: false,
              loop: true,
              loopDelay: 1200,
              strings: text[2]
            }} getBeforeInit={(instance) => {
              instance.pause(500).delete().type(text[3]).pause(500).delete().type(text[4]).pause(500);
              return instance;
            }}>
            </TypeIt>
          </Display>
          <div className="flex flex-row justify-start items-center gap-2 md:gap-3">
            <div className="h-[0.16rem] w-8 bg-content-100"></div>
            <Title
              className={twMerge(
                "uppercase tracking-widest",
                titleStyle({
                  weight: "bold",
                  size: "h6",
                  degree: "2",
                })
              )}
              h6
            >
              {titleH5Subtitle?.saveContent.content}
            </Title>
          </div>
        </div>
        <div
          className={twMerge(
            "flex flex-col gap-2 row-start-4 xs:row-start-3",
            "col-start-1 col-span-5 sm:col-span-4 md:col-span-3 2xl:col-span-2",
            "pb-4 2xl:pb-12",
            maxWidthOfBlock
          )}
        >
          <Title
            className={twMerge(
              "uppercase tracking-widest",
              titleStyle({
                weight: "semibold",
                size: "h6",
                degree: "2",
              })
            )}
            h6
          >
            {buttonAction?.saveContent.content}
          </Title>
          <Text className={proveStyle} p>
            {paraAction?.saveContent.content}
          </Text>
        </div>
        <div className="flex justify-start col-start-1 row-start-5 sm:row-start-4 col-span-3 place-self-stretch">
          <LinkAnimatedDecoration href='#'>
            {buttonNewsletter?.saveContent.children[0].content}
          </LinkAnimatedDecoration>
        </div>
        <div className={twMerge(
          "flex justify-start xl:justify-end place-self-stretch",
          "col-start-1 md:col-start-4 col-span-4 sm:col-span-2 xl:col-start-11 xl:col-span-2",
          "row-start-6 sm:row-start-5 md:row-start-4"
        )}>
          <LinkAnimatedDecoration href='#'>
            {buttonContact?.saveContent.children[0].content}
          </LinkAnimatedDecoration>
        </div>
      </div>
    </Container>
  );
};

export default Intro;
