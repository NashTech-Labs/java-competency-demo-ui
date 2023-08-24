import { TestBed } from '@angular/core/testing';

import { ShrinkAnalyzerService } from './shrink-analyzer.service';

describe('ShrinkAnalyzerService', () => {
  let service: ShrinkAnalyzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShrinkAnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
