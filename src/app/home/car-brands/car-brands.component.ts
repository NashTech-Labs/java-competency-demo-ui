import { Component } from '@angular/core';
import { BrandsList } from 'src/assets/data/brandsListJson'
import {Router} from "@angular/router";

@Component({
  selector: 'app-car-brands',
  templateUrl: './car-brands.component.html',
  styleUrls: ['./car-brands.component.scss']
})
export class CarBrandsComponent {
  data:Array<any> = BrandsList;

  onButtonClick(brandName:any) {
    console.log(brandName);
  }
}
