import { Component } from "@angular/core";
import { BrandsList } from "../../../../assets/data/brandsListJson";

@Component({
  selector: "app-car-search-result",
  templateUrl: "./car-search-result.component.html",
  styleUrls: ["./car-search-result.component.scss"],
})
export class CarSearchResultComponent {
  carsData: CarDetails1[] = [];
  ngOnInit() {
    this.carsData = BrandsList;
  }
}
interface CarDetails1 {
  brand_id: number;
  brand_name: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  price: string;
  location: string;
}
