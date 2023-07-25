import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-carsdata-card',
    templateUrl: './carsdata-card.component.html',
    styleUrls: ['./carsdata-card.component.scss']
})
export class CarsdataCardComponent {

    @Input() carCompanyName: string = '';
    @Input() carModel: string = '';
    @Input() carPrice: string = '';
    @Input() carMileage: string = '';
    @Input() manufacturingYear: string = '';
    @Input() carLocation: string = '';
    @Input() carColor: string = '';
}
