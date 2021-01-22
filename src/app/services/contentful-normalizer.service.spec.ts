import { TestBed } from '@angular/core/testing';

import { ContentfulNormalizerService } from './contentful-normalizer.service';

describe('ContentfulNormalizerService', () => {
  let service: ContentfulNormalizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentfulNormalizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
