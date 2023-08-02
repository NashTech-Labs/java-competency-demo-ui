import { Component, OnInit } from "@angular/core";
import { CarsListService } from "../card-list-service/cars-list.service";

/**
 * Represents the CarBrandsComponent that displays a list of car brands.
 * This component fetches brand names from the CarsListService and allows the user to select a brand.
 */
@Component({
  selector: "app-car-brands",
  templateUrl: "./car-brands.component.html",
  styleUrls: ["./car-brands.component.scss"],
})
export class CarBrandsComponent implements OnInit {
  /**
   * Observable that holds the brand names fetched from the CarsListService.
   */
  data$ = this.carsService.getBrandName();

  /**
   * Holds the selected brand name.
   */
  brandsName: string = "";

  /**
   * Creates an instance of CarBrandsComponent.
   * @param {CarsListService} carsService - The CarsListService to interact with data related to car brands.
   */
  constructor(private carsService: CarsListService) {
    // Subscribe to getBrandsName to update brandsName when it changes in the service.
    this.carsService.getBrandsName.subscribe(
        (name) => (this.brandsName = name),
    );
  }

  /**
   * Lifecycle hook called after the component is initialized.
   */
  ngOnInit(): void {}

  /**
   * Sends the selected car brand name to the CarsListComponent.
   * @param {string} name - The name of the selected car brand.
   */
  onBrandClick(name: string) {
    this.carsService.setBrandsName(name);
  }
}
