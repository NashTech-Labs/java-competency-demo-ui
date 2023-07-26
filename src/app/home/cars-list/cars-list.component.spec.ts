import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarsListComponent } from './cars-list.component';
import { CardService } from '../services/service.service';
import { of } from 'rxjs';
import {PaginationComponent} from "../pagination/pagination.component";

describe('CarsListComponent', () => {
    let component: CarsListComponent;
    let fixture: ComponentFixture<CarsListComponent>;
    let cardService: jasmine.SpyObj<CardService>;

    beforeEach(async () => {
        const cardServiceSpy = jasmine.createSpyObj('CardService', ['getData']);

        await TestBed.configureTestingModule({
            declarations: [CarsListComponent,PaginationComponent],
            providers: [{ provide: CardService, useValue: cardServiceSpy }],
        }).compileComponents();

        cardService = TestBed.inject(CardService) as jasmine.SpyObj<CardService>;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CarsListComponent);
        component = fixture.componentInstance;
    });

    it('should call getData on ngOnInit', () => {
        cardService.getData.and.returnValue(of([])); // Mock empty response for getData

        component.ngOnInit();

        expect(cardService.getData).toHaveBeenCalledTimes(1);
        expect(component.cars).toEqual([]); // Ensure that the component's cars property is set with the mock data.
    });


    it('should navigate to the next page of cars', () => {
        cardService.getData.and.returnValue(of(['Car A', 'Car B'])); // Mock response for getData

        component.nextPage();

        expect(cardService.getData).toHaveBeenCalledTimes(1);
        expect(cardService.getData).toHaveBeenCalledWith(component.pageNumber);
        expect(component.pageNumber).toBe(2); // Ensure that the pageNumber is incremented.
        expect(component.cars).toEqual(['Car A', 'Car B']); // Ensure that the component's cars property is set with the mock data.
    });

    it('should navigate to the previous page of cars if not on the first page', () => {
        component.pageNumber = 2;

        cardService.getData.and.returnValue(of(['Car C', 'Car D'])); // Mock response for getData

        component.previousPage();

        expect(cardService.getData).toHaveBeenCalledTimes(1);
        expect(cardService.getData).toHaveBeenCalledWith(component.pageNumber);
        expect(component.pageNumber).toBe(1); // Ensure that the pageNumber is decremented.
        expect(component.cars).toEqual(['Car C', 'Car D']); // Ensure that the component's cars property is set with the mock data.
    });

    it('should not navigate to the previous page if already on the first page', () => {
        component.pageNumber = 1;

        spyOn(console, 'log'); // Spy on console.log to check if it is called

        component.previousPage();

        expect(cardService.getData).toHaveBeenCalledTimes(0); // getData should not be called
        expect(console.log).toHaveBeenCalledWith('Already on page 1'); // Check if console.log is called with the expected message.
        expect(component.pageNumber).toBe(1); // pageNumber should remain the same.
    });
});
