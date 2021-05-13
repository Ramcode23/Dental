import { TestBed } from '@angular/core/testing';

import { PatiensService } from './patiens.service';

describe('PatiensService', () => {
  let service: PatiensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatiensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
