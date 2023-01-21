import { TestBed } from '@angular/core/testing';

import { PubService } from './pub.service';

describe('PubService', () => {
  let service: PubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
