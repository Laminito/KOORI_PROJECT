import { TestBed } from '@angular/core/testing';

import { EvaluationsService } from './evaluations.service';

describe('EvaluationsService', () => {
  let service: EvaluationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
