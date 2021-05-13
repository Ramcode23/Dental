import { TestBed } from '@angular/core/testing';

import { DiagnosticGuard } from './diagnostic.guard';

describe('DiagnosticGuard', () => {
  let guard: DiagnosticGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DiagnosticGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
