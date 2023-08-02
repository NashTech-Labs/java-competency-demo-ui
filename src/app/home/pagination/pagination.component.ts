import { Component } from "@angular/core";
import { CarsListComponent } from "../cars-list/cars-list.component";

/**
 * Represents a PaginationComponent that handles pagination logic for a CarsListComponent.
 */
@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent {
  /**
   * Creates an instance of PaginationComponent.
   * @param {CarsListComponent} carsData - The CarsListComponent to interact with its data and methods.
   */
  constructor(private carsData: CarsListComponent) {
    // The constructor is injecting the CarsListComponent to interact with its data and methods.
  }

  /**
   * Increases the current page count in the CarsListComponent.
   * Calls the nextPage() method in the CarsListComponent to advance to the next page.
   */
  increaseCount() {
    this.carsData.nextPage(); // Call the nextPage() method in the CarsListComponent.
  }

  /**
   * Decreases the current page count in the CarsListComponent.
   * Calls the previousPage() method in the CarsListComponent to go back to the previous page.
   */
  decreaseCount() {
    this.carsData.previousPage(); // Call the previousPage() method in the CarsListComponent.
  }
}
