import { TestBed } from '@angular/core/testing';

import { AllRequestService } from './all-request.service';

describe('AllRequestService', () => {
  let service: AllRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
