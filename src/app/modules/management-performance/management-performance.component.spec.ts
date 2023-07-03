import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPerformanceComponent } from './management-performance.component';

describe('ManagementPerformanceComponent', () => {
  let component: ManagementPerformanceComponent;
  let fixture: ComponentFixture<ManagementPerformanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementPerformanceComponent]
    });
    fixture = TestBed.createComponent(ManagementPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
