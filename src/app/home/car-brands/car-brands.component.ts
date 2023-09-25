import { Component, OnInit } from "@angular/core";
import { CarsListService } from "../services/cars-list.service";
import { ActivatedRoute } from "@angular/router";

/**
 * Component to display car brands and handle brand selection.
 */
@Component({
  selector: "app-car-brands",
  templateUrl: "./car-brands.component.html",
  styleUrls: ["./car-brands.component.scss"],
})
export class CarBrandsComponent implements OnInit {
  /**
   * Holds the data received from the service.
   */
  data: any;

  /**
   * Holds the selected brand name.
   */
  brandsName: string = "";

  /**
   * Flag to control the visibility of the brand loader (spinner).
   */
  brandLoader: boolean = false;

  /**
   * Constructor of the component.
   *
   * @param route The activated route to access route parameters.
   * @param carsService The service to fetch car brand data.
   */
  constructor(
      private route: ActivatedRoute,
      private carsService: CarsListService
  ) {}

  /**
   * Lifecycle hook. Called when the component is initialized.
   */
  ngOnInit(): void {
    this.getBrandName();
  }

  /**
   * Fetches the car brand name from the service.
   */
  getBrandName() {
    this.carsService.getBrandName().subscribe((name) => {
      this.data = name;
      this.brandLoader = true;
      console.log(name);
    });
  }

  /**
   * Handles the click event when a brand name is selected.
   *
   * @param name The selected brand name.
   */
  onBrandClick(name: string) {
    this.carsService.setBrandsName(name);
  }
}
