import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ContentType } from '../enums/ContentType.enum';
// import { ContentfulNormalizerService } from './contentful-normalizer.service';
import { ContentfulService } from './contentful.service';
import { environment } from 'src/environments/environment';
import { PgPage } from '../interfaces/pg-page';

import { Entry } from 'contentful';

@Injectable({
  providedIn: 'root',
})
export class PgPageService {
  pageNotFound: Partial<PgPage> = {
    slug: environment.slugNotFound ? environment.slugNotFound : '/not-found',
  };

  constructor(
    private contentfulService: ContentfulService,
    // private normalizerService: ContentfulNormalizerService,
    private router: Router
  ) {}

  /**
   *
   * @param slug The page's slug
   */
  public async getPageBySlug(slug: string): Promise<PgPage> {
    let page: PgPage;
    page = await this.getPageFromCache(slug);
    page = null;
    if (!page) {
      page = await this.getNormalizedPageFromContentful(slug);
      if (!page) {
        this.navigateTo404();
        return;
      }
      this.savePageIntoLocalStorage(page.pageCaching, slug, page);
    }
    return page;
  }

  async getPageFromCache(slug: string): Promise<PgPage> {
    const havePageInStorage = JSON.parse(window.localStorage.getItem(slug));
    const cacheExpireDate = Number(window.localStorage.getItem('cacheExpireDate'));
    if (havePageInStorage && cacheExpireDate > 0) {
      const isCacheExpired = cacheExpireDate < new Date().getTime();
      let page: PgPage;
      if (isCacheExpired) {
        page = await this.getNormalizedPageFromContentful(slug);
        this.savePageIntoLocalStorage(page.pageCaching, slug, page);
        if (!page) {
          this.navigateTo404();
          return;
        }
        return page;
      }
      page = JSON.parse(window.localStorage.getItem(slug));
      if (!page) {
        this.navigateTo404();
        return;
      }
      return page;
    }
    return;
  }

  /**
   * getNormalizedPageFromContentful
   *
   * @param slug  - Page's slug
   */
  private async getNormalizedPageFromContentful(slug: string): Promise<PgPage> {
    const query = {
      content_type: ContentType.PG_PAGE,
      'fields.slug': slug,
      include: 10,
    };
    if (environment.domain) {
      query['fields.domain'] = environment.domain;
    }
    const collection = await this.contentfulService.getEntries(query);
    const entry: Entry<any> = collection.items[0];
    return this.normalizerService.normalizePage(entry);
  }

  /**
   * savePageIntoLocalStorage
   *
   * @param pageCaching - The cache duration number (in hours)
   * @param slug - the page's slug
   * @param page - contentful pgpage
   */
  private savePageIntoLocalStorage(pageCaching: number, slug: string, page: PgPage): void {
    if (pageCaching && pageCaching > 0) {
      window.localStorage.setItem(slug, JSON.stringify(page));
      window.localStorage.setItem(
        'cacheExpireDate',
        String(new Date().getTime() + 1000 * 3600 * page.pageCaching)
      );
    }
  }

  private navigateTo404(): void {
    this.router.navigate([this.pageNotFound.slug], { replaceUrl: true });
  }
}
