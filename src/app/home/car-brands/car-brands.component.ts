import { Component, OnInit } from "@angular/core";
import { CarsListService } from "../card-list-service/cars-list.service";

@Component({
  selector: "app-car-brands",
  templateUrl: "./car-brands.component.html",
  styleUrls: ["./car-brands.component.scss"],
})
export class CarBrandsComponent implements OnInit {
  data$ = this.carsService.getBrandName();
  brandsName: string = "";

  constructor(private carsService: CarsListService) {
    this.carsService.getBrandsName.subscribe(
      (name) => (this.brandsName = name),
    );
  }

  ngOnInit(): void {}

  /**
   * Sends Selected Brands Name to CarsListComponent
   * @param name : name of selected car brand
   */
  onBrandClick(name: string) {
    this.carsService.setBrandsName(name);
  }
}
