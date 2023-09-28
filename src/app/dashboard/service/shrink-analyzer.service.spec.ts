import { TestBed } from '@angular/core/testing';

import { CarDataService } from './car-data.service';

describe('ShrinkAnalyzerService', () => {
  let service: CarDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
