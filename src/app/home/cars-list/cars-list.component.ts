import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CarsListService } from "../services/cars-list.service";

/**
 * Represents the Cars List component that displays a list of cars.
 */
@Component({
  selector: "app-cars-list",
  templateUrl: "./cars-list.component.html",
  styleUrls: ["./cars-list.component.scss"],
})
export class CarsListComponent implements OnInit, OnDestroy {
  /** The title of the component. */
  title = 'pagination';

  /** The list of cars to display. */
  cars: any;

  /** The current page number for pagination. */
  page: number = 1;

  /** The total count of items in the list. */
  count: number = 0;

  /** The number of items to display per page. */
  tableSize: number = 10;

  /** Available options for the number of items per page. */
  tableSizes: any = [5, 10, 15, 20];

  /** The name of the car brand to filter by. */
  brandsName: string = "";

  /** Indicates whether to show the car list. */
  showcarList: boolean = false;

  /** Subscription to data updates. */
  private dataSubscription!: Subscription;

  /**
   * Constructs the CarsListComponent.
   *
   * @param carsData - The service responsible for fetching car data.
   */
  constructor(private carsData: CarsListService) {}

  /**
   * Lifecycle hook: Initializes the component.
   */
  ngOnInit() {
    this.carsData.getBrandsName.subscribe((msg) => (this.brandsName = msg));
    this.getData();
  }

  /**
   * Fetches the list of cars from the service and updates the component's data.
   */
  getData(): void {
    this.carsData.getData().subscribe((data) => {
      this.cars = data;
      console.log(this.cars);
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
    this.getData();
  }

  /**
   * Event handler for changes in the number of items per page.
   *
   * @param event - The change event for the select element.
   */
  onTableSizeChange(event: any) {
    this.tableSizes = event.target.value;
    this.page = 1;
    this.getData();
  }

  /**
   * Lifecycle hook: Cleans up resources when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
