import { Component, OnDestroy, OnInit } from "@angular/core";
import { CarsListService } from "../services/cars-list.service";
import { CarBrand } from "../../shared/module/cars-details.model";
import { Subscription } from "rxjs";

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
  //brandEvents: any[] = [];
  private eventSubscription!: Subscription;
  events: string[] = [];
  //eventSource!: EventSource;
  //eventSubscription!: Subscription;
  //eventList: any[] = [];
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
    //const url = "http://52.149.247.168/v1/data/stream-sse";
    //const options = { withCredentials: true };
    const eventSource = new EventSource(
      "http://52.149.247.168/v1/data/stream-sse",
    );

    eventSource.onopen = function (event) {
      console.log("Connection opened");
    };

    eventSource.onmessage = function (event) {
      console.log("Message received:", event.data);
    };

    eventSource.onerror = function (event) {
      console.error("Error occurred:", event);
      console.log("ReadyState:", eventSource.readyState);
      console.log("Status:", event.target);
    };

    eventSource.close = () => {
      console.log("Status: closed");
    };

    // For continous events
    // this.eventSubscription = this.carsService
    //   .getBrandEvents()
    //   .subscribe((event: MessageEvent) => {
    //     console.log("control is here");
    //     const eventData = JSON.parse(event.data);
    //     this.eventList.push(eventData);
    //   });

    // this.eventSubscription = this.carsService
    //   .listenToEventSource(this.eventSource)
    //   .subscribe((event: MessageEvent) => {
    //     console.log("control is here");
    //     const eventData = JSON.parse(event.data);
    //     this.eventList.push(eventData);
    //   });
  }

  /**
   * Sends the selected car brand name to the CarsListComponent.
   * @param {string} name - The name of the selected car brand.
   */
  onBrandClick(name: string) {
    this.carsService.setBrandsName(name);
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
    // if (this.eventSource) {
    //   this.eventSource.close();
    // }
  }
}
