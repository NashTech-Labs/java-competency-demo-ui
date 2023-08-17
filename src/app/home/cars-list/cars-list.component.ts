import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CarsListService } from "../services/cars-list.service";

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
   * An array of cars fetched from the CardService based on the current page number.
   * The cars are of type 'Car', which conforms to the Car interface.
   */
  cars: any;

  /**
   * Subscription to store the subscription of the getData() method.
   */
  private dataSubscription!: Subscription;

  /**
   * Creates an instance of CarsListComponent.
   * @param carsData - The CardService instance used to fetch car data.
   */
  constructor(private carsDataService: CarsListService) {}

  /**
   * Lifecycle hook called after the component has been initialized.
   * It triggers the initial data fetch.
   */
  ngOnInit(): void {
    this.carsDataService.getBrandsName.subscribe(
      (msg) => (this.selectedCarBrand = msg),
    );
    if (this.selectedCarBrand.length == 0)
      this.selectedCarBrand = this.brandName;
    this.getCarModels(this.selectedCarBrand);
  }

  private getCarModels(brandsName: string) {
    this.dataSubscription = this.carsDataService
      .getCarModels(brandsName)
      .subscribe((data) => {
        this.cars = data;
        this.showcarList = true;
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
   * Lifecycle hook called when the component is about to be destroyed.
   * Unsubscribes from the dataSubscription to avoid memory leaks.
   */
  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
