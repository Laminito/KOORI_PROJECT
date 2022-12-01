import { TestBed } from '@angular/core/testing';

import { KooriService } from './koori.service';

describe('KooriService', () => {
  let service: KooriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KooriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
