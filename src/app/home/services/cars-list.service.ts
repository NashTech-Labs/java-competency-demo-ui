import { Injectable, Input, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { CarDetails } from "../../shared/module/cars-details.model";
/**
 * Service responsible for handling data related to the cars list.
 */
@Injectable({
  providedIn: "root",
})
export class CarsListService {
  private brandsName = new BehaviorSubject<string>("");
  private carModelsUrl = "http://34.30.6.79/v1/data/cars/";
  private brandUrl = "http://52.149.247.168/v1/data/stream-sse";

  /**
   * Observable to get the brands' names.
   */
  getBrandsName = this.brandsName.asObservable();

  /**
   * Creates an instance of CarsListService.
   * @param {HttpClient} http - The HttpClient service to make HTTP requests.
   */
  constructor(
    private http: HttpClient,
    private _zone: NgZone,
  ) {}

  /**
   * Method to fetch data from the mock API based on the provided page number.
   * @param {number} pageNumber - The page number to fetch data for.
   * @returns {Observable<any>} An Observable that emits the data fetched from the API.
   */
  getData(pageNumber: number): Observable<any> {
    const url = `${this.carModelsUrl}&page_number=${pageNumber}`;
    return this.http.get(url);
  }

  /**
   * Sets the brands' names.
   * @param {string} brandsName - The brands' names to set.
   */
  setBrandsName(brandsName: string): void {
    this.brandsName.next(brandsName);
  }

  /**
   * Gets the brand names from the mock API.
   * @returns {Observable<CarsDetails[]>} An Observable that emits the brand names data.
   */
  // getBrandName(): Observable<any> {
  //   return this.http.get<any>(this.brandUrl);
  // }

  getCarModels(carBrandName: string): Observable<CarDetails[]> {
    return this.http.get<CarDetails[]>(this.carModelsUrl.concat(carBrandName));
  }

  getEventStream(): Observable<any> {
    return this.http.get(`${this.brandUrl}`, {
      responseType: "text",
    });
  }

  // getEventSource(url: string): EventSource {
  //   //const options = { withCredentials: true };
  //   return new EventSource(url);
  // }

  listenToEventSource(eventSource: EventSource): Observable<MessageEvent> {
    return new Observable<MessageEvent>((observer) => {
      eventSource.onopen = (event) => {
        console.log("Connection opened:", event);
      };
      eventSource.onmessage = (event) => {
        observer.next(event);
      };

      eventSource.onerror = (error) => {
        console.log("Error occured", error);
        observer.error(error);
      };

      // eventSource.close = () => {
      //   observer.complete();
      // };
    });
  }

  getEventSource(): EventSource {
    return new EventSource("http://52.149.247.168/v1/data/stream-sse");
  }

  getBrandEvents(): Observable<any> {
    const eventSource = this.getEventSource();

    return new Observable((observer) => {
      eventSource.onmessage = (event) => {
        const eventData = JSON.parse(event.data);
        observer.next(eventData);
      };

      eventSource.onerror = (error) => {
        observer.error(error);
      };

      // Make sure to close the connection when unsubscribed
      return () => {
        eventSource.close();
      };
    });
  }
}
