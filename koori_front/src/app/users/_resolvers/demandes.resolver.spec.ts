import { TestBed } from '@angular/core/testing';

import { DemandesResolver } from './demandes.resolver';

describe('DemandesResolver', () => {
  let resolver: DemandesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DemandesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
