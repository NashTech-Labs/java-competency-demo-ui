/**
 * CarsListComponent displays a list of cars fetched from the CardService based on the current page number.
 *
 * The component is responsible for fetching and managing the data to display a paginated list of cars.
 * It allows navigation to the next and previous pages of cars.
 */

import {Component, Input, OnInit} from '@angular/core';
import {CardService} from '../services/service.service';

@Component({
    selector: 'app-cars-list',
    templateUrl: './cars-list.component.html',
    styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit {
    /**
     * An array containing the cars fetched from the service.
     */
    cars: any;

    /**
     * The current page number for paginated data.
     */
    pageNumber = 1;

    /**
     * Creates an instance of CarsListComponent.
     * @param carsData - The CardService instance used to fetch car data.
     */
    constructor(private carsData: CardService) {
    }

    /**
     * Lifecycle hook called after the component has been initialized.
     * It triggers the initial data fetch.
     */
    ngOnInit() {
        this.getData();
    }

    /**
     * Fetches data from the CardService based on the current page number.
     * The fetched data is stored in the 'cars' property.
     */
    private getData() {
        this.carsData.getData(this.pageNumber).subscribe((data) => {
            this.cars = data;
        });
    }

    /**
     * Navigates to the next page of cars.
     * Increments the 'pageNumber' property and fetches the new data.
     */
    nextPage() {
        this.pageNumber++;
        this.getData();
    }

    /**
     * Navigates to the previous page of cars if not on the first page.
     * Decrements the 'pageNumber' property and fetches the new data.
     * If already on the first page (pageNumber === 1), logs a message to the console.
     */
    previousPage() {
        if (this.pageNumber > 1) {
            this.pageNumber--;
            this.getData();
        } else {
            console.log("Already on page 1");
        }
    }
}
