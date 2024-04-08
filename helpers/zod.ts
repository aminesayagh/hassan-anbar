import { url } from 'inspector';
import { size } from 'lodash';
import { title } from 'process';
import { z } from 'zod';

const MediaDetailsSchema = z.object({
    width: z.number().optional().default(0),
    height: z.number().optional().default(0)
}).optional().default({
    width: 0,
    height: 0
});

const OpengraphImageSchema = z.object({
    altText: z.string().optional().default(''),
    link: z.string().optional().default(''),
    mediaDetails: MediaDetailsSchema
}).optional().default({
    altText: '',
    link: '',
    mediaDetails: {
        width: 0,
        height: 0
    }
});

const SeoSchema = z.object({
    title: z.string().optional().default('hassan-aanbar'),
    metaKeywords: z.string().optional().default(''),
    metaDesc: z.string().optional().default('Discover how to launch a profitable e-commerce store with zero ad spend. Maximize your margins with our expert tips for harnessing organic traffic effectively'),
    opengraphSiteName: z.string().optional().default('hassan-aanbar'),
    opengraphDescription: z.string().optional().default('Discover how to launch a profitable e-commerce store with zero ad spend. Maximize your margins with our expert tips for harnessing organic traffic effectively'),
    opengraphImage: OpengraphImageSchema,
    metaRobotsNoindex: z.string().optional().default('index'),
    metaRobotsNofollow: z.string().optional().default('follow'),
    focuskw: z.string().optional().default('Profitable E-Commerce Storem')
});

const ObjectSchema = z.any();
const CoreParagraphBlockSchema = z.object({
    name: z.string().optional().default('core/paragraph'),
    saveContent: ObjectSchema,
    attributesJSON: z.object({
        dropCap: z.boolean().optional().default(false),
        anchor: z.string().optional().default(''),
    })
});

const CoreHeadingBlockSchema = z.object({
    name: z.string().optional().default('core/heading'),
    saveContent: ObjectSchema,
    attributesJSON: z.object({
        dropCap: z.boolean().optional().default(false),
        anchor: z.string().optional().default(''),
    })
});

const CoreButtonBlockSchema = z.object({
    name: z.string().optional().default('core/buttons'),
    saveContent: ObjectSchema,
    attributesJSON: z.object({
        anchor: z.string().optional().default('')
    })
});

const CoreImageBlockSchema = z.object({
    name: z.string().optional().default('core/image'),
    saveContent: ObjectSchema,
    attributesJSON: z.object({
        anchor: z.string().optional().default(''),
        dropCap: z.boolean().optional().default(false),
    })
});

const BlockSchema = z.union([
    CoreParagraphBlockSchema,
    CoreHeadingBlockSchema,
    CoreButtonBlockSchema,
    CoreImageBlockSchema
]);

export const BlocksSchema = z.array(BlockSchema);

export const PageSchema = z.object({
    title: z.string().nullable(),
    seo: SeoSchema,
    blocks: z.array(z.union([
        CoreParagraphBlockSchema,
        CoreHeadingBlockSchema,
        CoreButtonBlockSchema,
        CoreImageBlockSchema
    ])).nullable()
});

export const GeneralSettingsSchema = z.object({
    language: z.string().nullable(),
    dateFormat: z.string().nullable()
});


const MenuItemNodeSchema = z.object({
    id: z.string(),
    label: z.string(),
    url: z.string(),
    parentId: z.string().nullable()
});

export const MenuNodeSchema = z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    menuItems: z.object({
        nodes: z.array(MenuItemNodeSchema)
    })
});

export const MenusSchema = z.object({
    nodes: z.array(MenuNodeSchema)
});

export const GetPageContentSchema = z.object({
    page: PageSchema,
    generalSettings: GeneralSettingsSchema,
    menus: MenusSchema,
    media: z.object({
        nodes: z.array(z.object({
            title: z.string(),
            id: z.string(),
            altText: z.string(),
            sourceUrl: z.string(),
            mediaDetails: MediaDetailsSchema
        }))
    })
});