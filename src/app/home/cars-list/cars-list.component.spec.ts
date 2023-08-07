import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CarsListComponent } from "./cars-list.component";
import { CarsListService } from "../services/cars-list.service";
import { of } from "rxjs";
import { PaginationComponent } from "../pagination/pagination.component";

/**
 * Test suite for CarsListComponent.
 */
describe("CarsListComponent", () => {
  let component: CarsListComponent;
  let fixture: ComponentFixture<CarsListComponent>;
  let cardService: jasmine.SpyObj<CarsListService>;

  /**
   * Prepare the testing environment.
   */
  beforeEach(async () => {
    const cardServiceSpy = jasmine.createSpyObj("CardService", ["getData"]);

    await TestBed.configureTestingModule({
      declarations: [CarsListComponent, PaginationComponent],
      providers: [{ provide: CarsListService, useValue: cardServiceSpy }],
    }).compileComponents();

    cardService = TestBed.inject(
      CarsListService,
    ) as jasmine.SpyObj<CarsListService>;
  });

  /**
   * Create the component and fixture before each test.
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(CarsListComponent);
    component = fixture.componentInstance;
  });

  /**
   * Test case: should navigate to the next page of cars
   */
  it("should navigate to the next page of cars", () => {
    cardService.getData.and.returnValue(of(["Car A", "Car B"])); // Mock response for getData

    component.nextPage();

    expect(cardService.getData).toHaveBeenCalledTimes(1);
    expect(cardService.getData).toHaveBeenCalledWith(component.pageNumber);
    expect(component.pageNumber).toBe(2); // Ensure that the pageNumber is incremented.
    expect(component.cars).toEqual(["Car A", "Car B"]); // Ensure that the component's cars property is set with the mock data.
  });

  /**
   * Test case: should navigate to the previous page of cars if not on the first page
   */
  it("should navigate to the previous page of cars if not on the first page", () => {
    component.pageNumber = 2;

    cardService.getData.and.returnValue(of(["Car C", "Car D"])); // Mock response for getData

    component.previousPage();

    expect(cardService.getData).toHaveBeenCalledTimes(1);
    expect(cardService.getData).toHaveBeenCalledWith(component.pageNumber);
    expect(component.pageNumber).toBe(1); // Ensure that the pageNumber is decremented.
    expect(component.cars).toEqual(["Car C", "Car D"]); // Ensure that the component's cars property is set with the mock data.
  });

  /**
   * Test case: should not navigate to the previous page if already on the first page
   */
  it("should not navigate to the previous page if already on the first page", () => {
    component.pageNumber = 1;

    spyOn(console, "log"); // Spy on console.log to check if it is called

    component.previousPage();

    expect(cardService.getData).toHaveBeenCalledTimes(0); // getData should not be called
    expect(console.log).toHaveBeenCalledWith("Already on page 1"); // Check if console.log is called with the expected message.
    expect(component.pageNumber).toBe(1); // pageNumber should remain the same.
  });
});
