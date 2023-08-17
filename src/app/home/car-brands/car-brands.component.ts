import { Component, OnDestroy, OnInit } from "@angular/core";
import { CarsListService } from "../services/cars-list.service";
import { CarBrand } from "../../shared/module/cars-details.model";

/**
 * Represents the CarBrandsComponent that displays a list of car brands.
 * This component fetches brand names from the CarsListService and allows the user to select a brand.
 */
@Component({
  selector: "app-car-brands",
  templateUrl: "./car-brands.component.html",
  styleUrls: ["./car-brands.component.scss"],
})
export class CarBrandsComponent implements OnInit, OnDestroy {
  events: string[] = [];
  /**
   * Observable that holds the brand names fetched from the CarsListService.
   */
  //data$ = this.carsService.getBrandName();

  carBrands: CarBrand[] = [];
  /**
   * Holds the selected brand name.
   */
  brandsName: string = "";

  /**
   * Creates an instance of CarBrandsComponent.
   * @param route
   * @param {CarsListService} carsService - The CarsListService to interact with data related to car brands.
   */
  constructor(private carsService: CarsListService) {}

  /**
   * Lifecycle hook called after the component is initialized.
   */
  ngOnInit(): void {
    // this.carsService.getEventStream().subscribe({
    //   next: (chunk: string) => {
    //     console.log("chunk ", chunk);
    //     const lines = chunk.split("\n");
    //     console.log("lines ", lines);
    //     let eventData = "";
    //     for (const line of lines) {
    //       if (line.startsWith("data:")) {
    //         const dataLine = line.substring(5).trim();
    //         if (dataLine) {
    //           eventData = dataLine;
    //           this.events.push(eventData);
    //         }
    //       }
    //     }
    //     console.log("this.events " + JSON.stringify(this.events));
    //     const parsedObjects = this.events.map((jsonString) =>
    //       JSON.parse(jsonString),
    //     );
    //
    //     // Map the parsed objects to the CarBrand interface
    //     this.carBrands = parsedObjects.map((parsedObject: any) => {
    //       return {
    //         brand: parsedObject.brand,
    //       };
    //     });
    //   },
    //   error: (error) => {
    //     console.error("Error streaming events:", error);
    //   },
    // });
  }

  /**
   * Sends the selected car brand name to the CarsListComponent.
   * @param {string} name - The name of the selected car brand.
   */
  onBrandClick(name: string) {
    this.carsService.setBrandsName(name);
  }

  ngOnDestroy() {}
}
