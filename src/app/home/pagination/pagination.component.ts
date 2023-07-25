import {Component} from '@angular/core';
import {CarsListComponent} from '../cars-list/cars-list.component';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
    constructor(private carsData: CarsListComponent) {
        // The constructor is injecting the CarsListComponent to interact with its data and methods.
    }

    // Method to increase the current page count in the CarsListComponent.
    increaseCount() {
        this.carsData.nextPage(); // Call the nextPage() method in the CarsListComponent.
        console.log(this.carsData.pageNumber); // Log the updated page number to the console.
    }

    // Method to decrease the current page count in the CarsListComponent.
    decreaseCount() {
        this.carsData.previousPage(); // Call the previousPage() method in the CarsListComponent.
        console.log(this.carsData.pageNumber); // Log the updated page number to the console.
    }
}
