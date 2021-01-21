/* eslint-disable @typescript-eslint/no-empty-function */

import { Injectable } from '@angular/core';
import { createClient } from 'contentful';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private client = createClient({
    space: environment?.contentful?.SPACE_ID || '',
    accessToken: environment?.contentful?.TOKEN || '',
  });
  constructor() {}
}
