import { TestBed } from '@angular/core/testing';

import { AllServicesResolver } from './all-services.resolver';

describe('AllServicesResolver', () => {
  let resolver: AllServicesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AllServicesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
