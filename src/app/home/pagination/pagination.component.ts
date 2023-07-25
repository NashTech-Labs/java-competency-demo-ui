import {Component} from '@angular/core';
import {CarsListComponent} from "../cars-list/cars-list.component";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

    constructor(private carsData: CarsListComponent) {
    }

    increaseCount() {
        this.carsData.nextPage();
        console.log(this.carsData.pageNumber);
    }

    decreaseCount() {
        this.carsData.previousPage();
        console.log(this.carsData.pageNumber)
    }

}
