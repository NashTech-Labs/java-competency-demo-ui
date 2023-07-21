import { Component, Output, EventEmitter } from '@angular/core';
import { BrandsList } from 'src/assets/data/brandsListJson'
import {Router} from "@angular/router";

@Component({
  selector: 'app-car-brands',
  templateUrl: './car-brands.component.html',
  styleUrls: ['./car-brands.component.scss']
})
export class CarBrandsComponent {
  data:Array<any> = BrandsList;
  @Output() brandsNameToHome = new EventEmitter<Array<any>>();

  onButtonClick(brandName:any) {
    this.brandsNameToHome.emit(brandName);
  }
}
