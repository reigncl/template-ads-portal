import { Injectable } from '@angular/core';
import { createClient, ContentfulCollection, Entry, ContentfulClientApi } from 'contentful';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private client: ContentfulClientApi;

  constructor() {
    this.client = createClient({
      space: environment.contentful.space,
      accessToken: environment.contentful.accessToken,
      host: environment.contentful.host,
      environment: environment.contentful.environment,
    });
  }

  /**
   * @param query The query string
   */
  getEntries(query?: any): Promise<ContentfulCollection<Entry<any>>> {
    console.log('getEntries', query);
    return this.client.getEntries(query);
  }

  /**
   * @param is The entry id
   * @param query The query string
   */
  async getEntry(id: string, query?: any): Promise<Entry<any>> {
    try {
      return await this.client.getEntry(id, query);
    } catch (error) {
      return;
    }
  }
}
