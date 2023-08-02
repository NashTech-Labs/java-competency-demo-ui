import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatToolbarModule} from '@angular/material/toolbar'; // Import the MatToolbarModule

import {HomeComponent} from './home.component';
import {CarsListComponent} from "./cars-list/cars-list.component";
import {HttpClientModule} from '@angular/common/http';
import {PaginationComponent} from "./pagination/pagination.component";
import {RouterTestingModule} from '@angular/router/testing';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent, CarsListComponent, PaginationComponent],

            imports: [RouterTestingModule, HttpClientModule, MatToolbarModule], // Add the MatToolbarModule to the imports array
        });
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
