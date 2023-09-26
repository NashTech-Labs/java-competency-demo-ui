import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { CarsListService } from "../services/cars-list.service";
import { CarDetails } from "../../shared/module/cars-details.model";

/**
 * Represents the Cars List component that displays a list of cars.
 */
@Component({
  selector: "app-cars-list",
  templateUrl: "./cars-list.component.html",
  styleUrls: ["./cars-list.component.scss"],
})
export class CarsListComponent implements OnInit, OnDestroy {
  @Input("brandName") brandName = "";
  /**
   * Determines if the car list should be shown.
   */
  showcarList: boolean = false;

  /** Available options for the number of items per page. */
  tableSizes: any = [5, 10, 15, 20];

  /** The name of the car brand to filter by. */
  // brandsName: string = "";
  /**
   * The car brand name selected in car-brands component.
   */
  selectedCarBrand: string = "";

  /**
   * The current page number for paginated data.
   */
  page: number = 1;

  /** The total count of items in the list. */
  count: number = 0;

  /** The number of items to display per page. */
  tableSize: number = 10;

  /**
   * An array of cars fetched from the CarService based on the current page number.
   * The cars are of type 'Car', which conforms to the Car interface.
   */
  carModelDetails: CarDetails[] = [];

  /**
   * Constructs the CarsListComponent.
   *
   * @param carsData - The service responsible for fetching car data.
   */
  constructor(private carsDataService: CarsListService) {}

  /**
   * Lifecycle hook: Initializes the component.
   */
  ngOnInit(): void {
    if (this.selectedCarBrand.length == 0)
      this.selectedCarBrand = this.brandName;
    this.getCarModels(this.selectedCarBrand);
  }

  private getCarModels(brandName: string) {
    this.carsDataService.getCarModels(brandName).subscribe((carDetails) => {
      this.carModelDetails = carDetails;
    });
  }

  /**
   * Event handler for page changes in pagination.
   *
   * @param event - The page change event.
   */
  onTableDataChange(event: any) {
    this.page = event;
    this.getCarModels(this.selectedCarBrand);
  }

  /**
   * Event handler for changes in the number of items per page.
   *
   * @param event - The change event for the select element.
   */
  onTableSizeChange(event: any) {
    this.tableSizes = event.target.value;
    this.page = 1;
    this.getCarModels(this.selectedCarBrand);
  }

  /**
   * Lifecycle hook: Cleans up resources when the component is destroyed.
   */
  ngOnDestroy() {}
}
