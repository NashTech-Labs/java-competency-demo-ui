import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { CardService } from "../card-list-service/car-llist-service";

@Component({
  selector: "app-cars-list",
  templateUrl: "./cars-list.component.html",
  styleUrls: ["./cars-list.component.scss"],
})
export class CarsListComponent implements OnInit, OnDestroy {
  /**
   * An array of cars fetched from the CardService based on the current page number.
   * The cars are of type 'Car', which conforms to the Car interface.
   */
  cars: any;

  /**
   * The current page number for paginated data.
   */
  pageNumber = 1;

  /**
   * Subscription to store the subscription of the getData() method.
   */
  private dataSubscription!: Subscription;

  /**
   * Creates an instance of CarsListComponent.
   * @param carsData - The CardService instance used to fetch car data.
   */
  constructor(private carsData: CardService) {}

  /**
   * Lifecycle hook called after the component has been initialized.
   * It triggers the initial data fetch.
   */
  ngOnInit() {
    this.getData();
  }

  /**
   * Fetches data from the CardService based on the current page number.
   * The fetched data is stored in the 'cars' property.
   */
  private getData() {
    this.dataSubscription = this.carsData.getData(this.pageNumber).subscribe((data) => {
      this.cars = data;
    });
  }

  /**
   * Navigates to the next page of cars.
   * Increments the 'pageNumber' property and fetches the new data.
   */
  nextPage() {
    this.pageNumber++;
    this.getData();
  }

  /**
   * Navigates to the previous page of cars if not on the first page.
   * Decrements the 'pageNumber' property and fetches the new data.
   * If already on the first page (pageNumber === 1), logs a message to the console.
   */
  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getData();
    } else {
      console.log("Already on page 1");
    }
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
