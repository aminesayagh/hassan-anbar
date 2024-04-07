import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client';
import { Parser, DomHandler } from 'htmlparser2'; // For parsing HTML content
import { cloneDeep, isString } from 'lodash';

import * as cheerio from 'cheerio';

interface BlockContentSchema {
  type: string;
  content?: string;
  attributes?: Record<string, any>;
  children?: BlockContentSchema[];
}

const parseBlockContent = (htmlContent: string, blockType: string): BlockContentSchema => {
  const $ = cheerio.load(htmlContent);
  let schema: BlockContentSchema = { type: blockType };

  switch (blockType) {
    case 'core/paragraph':
      schema.content = $('p').text();
      break;
    case 'core/heading':
      schema.content = $('h1, h2, h3, h4, h5, h6').text();
      schema.attributes = { level: $('h1, h2, h3, h4, h5, h6').get(0)?.tagName };
      break;
    case 'core/buttons':
      schema.children = $('a').map((_, el) => {
        const $el = $(el);
        return {
          type: 'core/button',
          content: $el.text(),
          attributes: {
            rel: $el.attr('rel'),
            class: $el.attr('class'),
            
          }
        };
      }).get();
      break;
    case 'core/image':
      schema.attributes = {
        src: $('img').attr('src'),
        alt: $('img').attr('alt')
      };
      break;
    default:
      console.warn('Unsupported block type ', blockType);

      break;
  }

  return schema;
};

const deserializeBlocks = (blocks: any[]) => {
  return blocks.map(block => {
    const newBlock = cloneDeep(block);

    if (newBlock.attributesJSON && isString(newBlock.attributesJSON)) {
      try {
        newBlock.attributesJSON = JSON.parse(newBlock.attributesJSON);
      } catch (error) {
        console.error('JSON parsing error in deserializeBlocks:', error);
      }
    }

    if (newBlock.saveContent && isString(newBlock.saveContent)) {
      const root = parseBlockContent(newBlock.saveContent, newBlock.name);
      newBlock.saveContent = root;
      console.log('root ', root);
    }

    return newBlock;
  });
};

const deserializeLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const { data } = response;

    if (data && data.page && data.page.blocks) {
      data.page.blocks = deserializeBlocks(data.page.blocks);
    }
    return response;
  });
});

const createApolloClient = () => {
  return new ApolloClient({
    link: from([
      deserializeLink,
      new HttpLink({
        uri: 'https://hassanaanbar.masayagh.com/graphql'
      })
    ]),
    cache: new InMemoryCache(),
  });
};

export const apolloClient = createApolloClient();