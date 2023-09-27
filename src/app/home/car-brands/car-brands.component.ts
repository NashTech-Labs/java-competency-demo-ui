import { Component, OnDestroy, OnInit } from "@angular/core";
import { CarsListService } from "../services/cars-list.service";
import { CarBrand } from "../../shared/module/cars-details.model";
import { Subscription } from "rxjs";

/**
 * Component to display car brands and handle brand selection.
 */
@Component({
  selector: "app-car-brands",
  templateUrl: "./car-brands.component.html",
  styleUrls: ["./car-brands.component.scss"],
})
export class CarBrandsComponent implements OnInit, OnDestroy {
  carBrands: CarBrand[] = [];
  sseSubscription!: Subscription;
  /**
   * Flag to control the visibility of the brand loader (spinner).
   */
  brandLoader: boolean = false;

  /**
   * Constructor of the component.
   *
   * @param route The activated route to access route parameters.
   * @param carsService The service to fetch car brand data.
   * Creates an instance of CarBrandsComponent.
   * @param route
   * @param {CarsListService} carsService - The CarsListService to interact with data related to car brands.
   */
  constructor(private carsService: CarsListService) {}

  /**
   * Lifecycle hook. Called when the component is initialized.
   */
  ngOnInit(): void {
    this.getBrandsSSE();
    //this.getCarBrands();
  }

  /**
   * Sends the selected car brand name to the CarsListComponent.
   * @param {string} name - The name of the selected car brand.
   */
  onBrandClick(name: string) {
    this.carsService.setBrandsName(name);
  }

  getCarBrands(): void {
    this.carsService.getCarBrands().subscribe((brands) => {
      this.carBrands = brands;
      this.brandLoader = true;
    });
  }

  getBrandsSSE(): void {
    this.sseSubscription = this.carsService.subscribeToCarData().subscribe(
      (carDetails: CarBrand) => {
        // Handle SSE data here
        // console.log("Received SSE data:", carDetails);
        this.carBrands.push(carDetails); // Add to your list of car details
        this.brandLoader = true;
        console.log("this.carBrands ", JSON.stringify(this.carBrands));
      },
      (error) => {
        // Handle SSE error
        console.error("Error occurred:", error);
      },
    );
  }
  ngOnDestroy() {
    if (this.sseSubscription) {
      this.sseSubscription.unsubscribe();
    }
  }
}
