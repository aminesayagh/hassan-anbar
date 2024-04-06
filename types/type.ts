export type Page = {
    __typename: 'Page',
    title: string,
    blocks: BlockAttributes[]
    seo: {
        __typename: 'PostTypeSEO',
        title: string,
        metaDesc: string,
        metaRobotsNoindex: boolean,
        metaRobotsNofollow: boolean,
        focuskw: string,
        fullHead: string,
    },
    content: string,
    generalSettings: {
        title: string,
        description: string,
        url: string,
    }
}


type BlockAttributes = CoreHeadingBlockAttributes | CoreParagraphBlockAttributes | CoreButtonBlockAttributes | CoreImageBlockAttributes

type CoreHeadingBlockAttributes = {
    __typename: 'CoreHeadingBlock',
    name: 'core/heading',
    saveContent: string,
    attributesJSON: string,
}

type CoreParagraphBlockAttributes = {
    __typename: 'CoreParagraphBlock',
    name: 'core/paragraph',
    saveContent: string,
    attributesJSON: string,
}

type CoreButtonBlockAttributes = {
    __typename: 'CoreButtonBlock',
    name: 'core/button',
    saveContent: string,
    attributesJSON: string,
}

type CoreImageBlockAttributes = {
    __typename: 'CoreImageBlock',
    name: 'core/image',
    saveContent: string,
    attributesJSON: string
}

