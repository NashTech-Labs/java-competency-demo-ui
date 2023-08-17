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
  private brandUrl = "http://52.149.247.168/v1/data/brands-sse";

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
}
