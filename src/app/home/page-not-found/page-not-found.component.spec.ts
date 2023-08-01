import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataNotFoundComponent } from './page-not-found.component';

describe('DataNotFoundComponent', () => {
  let component: DataNotFoundComponent;
  let fixture: ComponentFixture<DataNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Import RouterTestingModule for route testing
      declarations: [DataNotFoundComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /home on button click', () => {
    const routerSpy = spyOn(component['router'], 'navigate'); // Spy on the router navigate method
    const button = fixture.nativeElement.querySelector('.go-to-dashboard');
    button.click();
    fixture.detectChanges();

    expect(routerSpy).toHaveBeenCalledWith(['/home']); // Expect the router to be called with the correct route
  });
});
