import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpcReadListComponent } from './epc-read-list.component';

describe('EpcReadListComponent', () => {
  let component: EpcReadListComponent;
  let fixture: ComponentFixture<EpcReadListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpcReadListComponent]
    });
    fixture = TestBed.createComponent(EpcReadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
