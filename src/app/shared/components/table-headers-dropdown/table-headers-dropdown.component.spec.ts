import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHeadersDropdownComponent } from './table-headers-dropdown.component';

describe('TableHeadersDropdownComponent', () => {
  let component: TableHeadersDropdownComponent;
  let fixture: ComponentFixture<TableHeadersDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableHeadersDropdownComponent]
    });
    fixture = TestBed.createComponent(TableHeadersDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
