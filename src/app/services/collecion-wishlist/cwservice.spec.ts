import { TestBed } from '@angular/core/testing';

import { CWService } from './cwservice';

describe('CWService', () => {
  let service: CWService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CWService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
