import {Component, Input, OnInit} from '@angular/core';
import {CardService} from "../services/service.service";


@Component({
    selector: 'app-cars-list',
    templateUrl: './cars-list.component.html',
    styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit {

    cars: any;
    pageNumber = 1;

    constructor(private carsData: CardService) {
    }

    ngOnInit() {
        this.getData();
    }

    private getData() {
        this.carsData.getData(this.pageNumber).subscribe((data) => {
            this.cars = data;
        });
    }

    nextPage() {
        this.pageNumber++;
        this.getData();
    }

    previousPage() {
        if (this.pageNumber > 1) {
            this.pageNumber--;
            this.getData();
        } else {
            console.log("Already on page 1");
        }
    }
}
