import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RFIDExitRoadComponent } from './rfid-exit-road.component';

describe('RFITExitRoadComponent', () => {
  let component: RFIDExitRoadComponent;
  let fixture: ComponentFixture<RFIDExitRoadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RFIDExitRoadComponent]
    });
    fixture = TestBed.createComponent(RFIDExitRoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
