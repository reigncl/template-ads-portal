import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContentType } from '../enums/ContentType.enum';
import { environment } from 'src/environments/environment';
import { MetaServiceService } from '../services/meta-service.service';
import { PgPage } from '../interfaces/pg-page';
import { PgPageService } from '../services/pg-page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
})
export class PageComponent implements OnInit {
  appVersion = environment.appVersion;

  ContentType = ContentType;
  // ContentTypeTemplate = ContentTypeTemplate;
  page: PgPage;
  slugRequest = '';

  isHeadless = false;
  isMobile = false;

  constructor(
    private metaService: MetaServiceService,
    private pgPageService: PgPageService,
    private route: ActivatedRoute
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    this.isMobile = width < 1200;
  }

  ngOnInit(): void {
    this.configPage();
    this.subscribeToPage();
  }

  configPage(): void {
    const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    this.isMobile = width < 1200;
  }

  subscribeToPage(): void {
    this.route.params.subscribe((params) => {
      if (!!this.route.snapshot.queryParamMap.get('headless')) {
        this.isHeadless = true;
      }
      if (params) {
        this.slugRequest = Object.keys(params).reduce((totalSlug, slug) => {
          if (slug) {
            totalSlug = `${totalSlug}/${params[slug]}`;
          }
          return totalSlug;
        }, '');
      }
      this.slugRequest = this.slugRequest !== '' ? this.slugRequest : environment.slugHome;
      this.requestPage(this.slugRequest);
    });
  }

  async requestPage(slug: string = environment.slugHome): Promise<void> {
    try {
      this.page = await this.pgPageService.getPageBySlug(slug);
      if (this.page) {
        this.setupMetas();
      }
    } catch (errorRequestPage) {
      console.log('errorRequestPage', errorRequestPage);
    }
  }

  setupMetas(): void {
    const titlePage = this.page.title;
    const descriptionPage = this.page.description;
    const { href, host, protocol } = window.location;
    const baseDomain = `${protocol}//${host}`;
    this.metaService.setTitle(titlePage);
    this.metaService.setMeta('description', descriptionPage);
    this.metaService.setMeta('rating', 'general');

    if (this.page.keywords) {
      this.metaService.setMeta('keywords', this.page.keywords.toString());
    }

    if (!environment.enabledRobots || this.page.preventIndexing) {
      this.metaService.setMeta('robots', 'none');
    }

    if (this.page.canonicalLink) {
      this.metaService.setCanonicalLink(this.page.canonicalLink);
    }

    // Open Graph
    this.metaService.setMeta('og:type', 'website');
    this.metaService.setMeta('og:title', titlePage);
    this.metaService.setMeta('og:description', descriptionPage);
    this.metaService.setMeta('og:image', `${baseDomain}/assets/${titlePage}.png`);
    this.metaService.setMeta('og:url', href);
    this.metaService.setMeta('og:site_name', environment.siteName);
  }
}
