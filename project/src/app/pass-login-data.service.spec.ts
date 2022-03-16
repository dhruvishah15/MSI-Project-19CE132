import { TestBed } from '@angular/core/testing';

import { PassLoginDataService } from './pass-login-data.service';

describe('PassLoginDataService', () => {
  let service: PassLoginDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassLoginDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
