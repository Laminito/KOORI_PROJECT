import { TestBed } from '@angular/core/testing';

import { CatalogueServiceService } from './catalogue-service.service';

describe('CatalogueServiceService', () => {
  let service: CatalogueServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogueServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
