import { Injectable, Input, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { CarDetails, CarBrand } from "../../shared/module/cars-details.model";
/**
 * Service responsible for handling data related to the cars list.
 */
@Injectable({
  providedIn: "root",
})
export class CarsListService {
  private brandsName = new BehaviorSubject<string>("");
  private carModelsUrl = "http://34.31.253.72/v1/data/cars/";
  private brandsUrlGCP = "http://34.31.253.72/v1/data/brands";
  private brandsUrlGCPSSE = "http://34.173.146.220:80/v1/data/brands-sse";
  private eventSource!: EventSource;
  carModelDetails: CarDetails[] = [];

  // /**
  //  * Observable to get the brands' names.
  //  */
  getBrandsName = this.brandsName.asObservable();

  /**
   * Creates an instance of CarsListService.
   * @param {HttpClient} http - The HttpClient service to make HTTP requests.
   */
  constructor(
    private http: HttpClient,

    private zone: NgZone,
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
  getCarBrands(): Observable<CarBrand[]> {
    return this.http.get<CarBrand[]>(this.brandsUrlGCP);
  }

  getCarModels(carBrandName: string): Observable<CarDetails[]> {
    return this.http.get<CarDetails[]>(this.carModelsUrl.concat(carBrandName));
  }

  subscribeToCarData(carBrand: string): Observable<CarDetails> {
    const url = `http://34.31.253.72/v1/data/cars/${carBrand}`; // Replace with your actual URL

    this.eventSource = new EventSource(url);

    return new Observable<CarDetails>((observer) => {
      this.eventSource.onmessage = (event) => {
        const carData = JSON.parse(event.data);

        const carDetails: CarDetails = {
          carId: carData.carId,
          brand: carData.brand,
          model: carData.model,
          year: carData.year,
          color: carData.color,
          mileage: carData.mileage,
          price: carData.price, // Format price as needed
        };

        this.carModelDetails.push(carDetails);
        observer.next(carDetails);
      };

      this.eventSource.onerror = (error) => {
        observer.error(error);
      };

      return () => {
        this.eventSource.close();
      };
    });
  }
}
