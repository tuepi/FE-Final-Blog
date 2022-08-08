import { TestBed } from '@angular/core/testing';

import { PostLabelService } from './post-label.service';

describe('PostLabelService', () => {
  let service: PostLabelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostLabelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
