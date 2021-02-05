/* eslint-disable @typescript-eslint/no-empty-function */

import { Injectable } from '@angular/core';

import { AssetNormalizerSet } from '../sets/asset-normalizer.set';
import { DefaultNormalizerSet, MapNormalizerSet } from '../sets/default-normalizer.set';
import { DocumentRichText } from '../interfaces/document-rich-text.interface';
import { Block, PgPage } from '../interfaces/pg-page';

import { Asset, Entry } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

@Injectable({
  providedIn: 'root',
})
export class ContentfulNormalizerService {
  constructor() {}

  /**
   * Normalize Contentful Page
   * @param contentfulPage The contentful pg-page
   */
  normalizePage(contentfulPage: Entry<any>): PgPage | undefined {
    if (!contentfulPage) {
      return;
    }
    const {
      id,
      contentType,
      contentType: {
        sys: { id: contentTypeId },
      },
    } = contentfulPage.sys;
    const {
      title,
      description,
      slug,
      template,
      blocks,
      modals,
      footer,
      header,
      keywords,
      keywordsSearch,
      canonicalLink,
      preventIndexing,
      pageCaching,
    } = contentfulPage.fields;
    return {
      id,
      contentTypeId,
      title,
      description,
      keywords,
      keywordsSearch,
      canonicalLink,
      preventIndexing,
      slug,
      template: template && this.normalizeBlock(template),
      blocks: blocks
        ? blocks.map((contentfulBlock: any) => this.normalizeBlock(contentfulBlock))
        : [],
      modals: modals
        ? modals.map((contentfulBlock: any) => this.normalizeBlock(contentfulBlock))
        : [],
      footer: footer && this.normalizeBlock(footer),
      header: header && this.normalizeBlock(header),
      pageCaching,
    };
  }

  /**
   * Normalize Contentful Block
   * @param contentfulBlock The contentful block
   */
  normalizeBlock(contentfulBlock: Entry<any>): Block {
    if (contentfulBlock && contentfulBlock.sys && contentfulBlock.sys.contentType) {
      const { id, contentType } = contentfulBlock.sys;
      const contentTypeId = contentType.sys.id;
      const { fields } = contentfulBlock;
      const block = this.normalizeDefault(fields, contentTypeId);
      console.log(block);
      return {
        id,
        contentTypeId,
        contentType: contentTypeId,
        ...block,
      };
    }
  }

  normalizeDefault(newBlockInProp: any, contentTypeId: string): any {
    const newBlockIn = { contentTypeId, contentType: contentTypeId, ...newBlockInProp };

    for (const option of DefaultNormalizerSet.keys()) {
      if (option in newBlockIn && newBlockIn[option].fields) {
        const contentType = newBlockIn[option].sys.contentType.sys.id;
        newBlockIn[option] = this.normalizeDefault(newBlockIn[option].fields, contentType);
      }
    }
    for (const asset of AssetNormalizerSet.keys()) {
      if (asset in newBlockIn && newBlockIn[asset].fields) {
        newBlockIn[asset] = this.normalizeAsset(newBlockIn[asset]);
      }
    }
    for (const option of MapNormalizerSet.keys()) {
      if (
        option in newBlockIn &&
        typeof newBlockIn[option] !== 'string' &&
        newBlockIn[option].length > 0
      ) {
        const blockArray = newBlockIn[option];
        newBlockIn[option] = blockArray.map((elem: any) =>
          this.normalizeDefault(elem.fields, elem.sys.contentType.sys.id)
        );
      }
    }

    // RICH TEXT
    if (newBlockIn.richText) {
      newBlockIn.richText = this.normalizeRichText(newBlockIn.richText, contentTypeId);
    }

    return newBlockIn;
  }

  /**
   * Normalize Contentful Asset
   * @param contentfulAsset Asset
   */
  normalizeAsset(
    contentfulAsset: Asset
  ): { id: string | number; url: string; title: string; alt: string; contentType: string } | Asset {
    if (contentfulAsset && contentfulAsset.fields && contentfulAsset.fields.file) {
      return {
        id: contentfulAsset.sys.id,
        url: contentfulAsset.fields.file.url,
        title: contentfulAsset.fields.title,
        alt: contentfulAsset.fields.title,
        contentType: contentfulAsset.fields.file.contentType,
      };
    }
    return contentfulAsset;
  }

  normalizeRichText(documentAsset: DocumentRichText, contentType: string): string {
    const docString = documentToHtmlString(documentAsset as any);
    return docString;
  }
}
