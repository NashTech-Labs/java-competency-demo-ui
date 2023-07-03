import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShrinkVisibiltyComponent } from './shrink-visibilty.component';

describe('ShrinkVisibiltyComponent', () => {
  let component: ShrinkVisibiltyComponent;
  let fixture: ComponentFixture<ShrinkVisibiltyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShrinkVisibiltyComponent]
    });
    fixture = TestBed.createComponent(ShrinkVisibiltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
