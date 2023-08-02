import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PaginationComponent } from "./pagination.component";
import { CarsListComponent } from "../cars-list/cars-list.component";

describe("PaginationComponent", () => {
    let component: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;
    let carsDataMock: jasmine.SpyObj<CarsListComponent>;

    beforeEach(async () => {
        const carsDataSpy = jasmine.createSpyObj("CarsListComponent", [
            "nextPage",
            "previousPage",
        ]);

        await TestBed.configureTestingModule({
            declarations: [PaginationComponent],
            providers: [{ provide: CarsListComponent, useValue: carsDataSpy }],
        }).compileComponents();

        carsDataMock = TestBed.inject(CarsListComponent) as jasmine.SpyObj<
            CarsListComponent
        >;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PaginationComponent);
        component = fixture.componentInstance;
    });

    it("should call nextPage() in CarsListComponent when increaseCount is called", () => {
        component.increaseCount();
        expect(carsDataMock.nextPage).toHaveBeenCalledTimes(1);
    });

    it("should call previousPage() in CarsListComponent when decreaseCount is called", () => {
        component.decreaseCount();
        expect(carsDataMock.previousPage).toHaveBeenCalledTimes(1);
    });
});
