import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-carsdata-card',
    templateUrl: './carsdata-card.component.html',
    styleUrls: ['./carsdata-card.component.scss']
})
export class CarsdataCardComponent {

    // Input properties to receive data from the parent component.
    // These properties will be bound to corresponding attributes in the HTML template.
    @Input() carCompanyName: string = '';       // Holds the name of the car's manufacturing company.
    @Input() carModel: string = '';             // Holds the model name of the car.
    @Input() carPrice: string = '';             // Holds the price of the car.
    @Input() carMileage: string = '';           // Holds the mileage information of the car.
    @Input() manufacturingYear: string = '';    // Holds the manufacturing year of the car.
    @Input() carLocation: string = '';          // Holds the location information of the car.
    @Input() carColor: string = '';             // Holds the color of the car.
}
