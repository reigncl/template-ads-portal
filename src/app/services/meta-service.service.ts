import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaServiceService {
  constructor(
    private meta: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private document
  ) {}

  setMeta(key: string, value: string): void {
    if (key && value) {
      this.meta.updateTag({
        name: key,
        content: value,
      });
    }
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  setCanonicalLink(url: string): void {
    const link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.document.head.appendChild(link);
    link.setAttribute('href', url);
  }
}
