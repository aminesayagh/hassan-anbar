import useValidGetContentQuery from "@/hook/useValidGetContentQuery";
import Text from "@/components/ui/typography/Text";
import Display from "@/components/ui/typography/Display";
import Title from "@/components/ui/typography/Title";
import Button, { buttonUnderlineStyle } from "@/components/ui/button";
import Container, { containerStyle } from '@/components/ui/container';

import {
  textStyle,
  titleStyle,
} from "@/components/ui/typography/Typography.style";
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

const normalButtonStyle = twMerge('uppercase w-auto text-right whitespace-nowrap-important tracking-wider', textStyle({
  size: 'sm',
  weight: 'bold',
  degree: '1'
}));

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

  return (
    <Container as='section' size='lg' id='intro' className='relative h-screen'>

      <div className={twMerge(containerStyle({
        size: 'lg'
      }), 'absolute z-0 max-h-screen w-full h-full grid grid-cols-12 grid-rows-1 gap-4 right-0')}>
        <div className="col-start-7 col-span-6 row-start-1 row-span-4  h-full z-10">
          <img
            src={imageMain?.saveContent.attributes.src}
            alt={imageMain?.saveContent.attributes.alt}
            className="w-full h-full object-contain object-center"
          />
        </div>
        <div className="col-start-7 col-span-6 row-start-1 row-span-4 h-full">
          <div className='w-full h-[140%] mt-12 rounded-full bg-primary-500 opacity-50 blur-[240px]'></div>
        </div>
      </div>
      <div className="relative z-10 grid grid-cols-12 grid-rows-[repeat(4,_minmax(0,_auto))] gap-4 justify-between auto-rows-max items-start h-full pb-4 pt-24 content-between">
        <Text className={twMerge(proveStyle, "col-start-1 row-start-1 col-span-3 z-20")} p>
          {paraProve1?.saveContent.content}
        </Text>
        <Text className={twMerge(proveStyle, "col-start-4 row-start-1 col-span-3 z-20")} p>
          {paraProve2?.saveContent.content}
        </Text>
        <div className="flex flex-col justify-start items-start gap-2 row-start-1 col-start-11 col-span-2 z-20">
          <Text className={proveStyle} p>
            {paraProve3?.saveContent.content}
          </Text>
          <span>
            <Button className={normalButtonStyle}>
              {buttonJoin?.saveContent.children[0].content}
            </Button>
          </span>
        </div>
        <div className="flex flex-col gap-6 col-start-1 col-span-7 row-start-2 row-span-1 pb-9">
          <Display weight="bold" size="xl" className="uppercase relative -left-2">
            {titleH1Main?.saveContent.content}
          </Display>
          <div className="flex flex-row justify-start items-center gap-4">
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
        <div className="flex flex-col gap-2 row-start-3 col-start-1 col-span-3 pb-12">
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
        <div className="col-start-1 row-start-4 col-span-3">
          <Button className={normalButtonStyle}>
            {buttonNewsletter?.saveContent.children[0].content}
          </Button>
        </div>
        <div className='flex justify-end items-end col-start-11 col-span-2 row-start-4'>
          <Button className={normalButtonStyle}>
            {buttonContact?.saveContent.children[0].content}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Intro;
