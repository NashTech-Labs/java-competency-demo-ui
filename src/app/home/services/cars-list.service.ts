import { Injectable } from "@angular/core";
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
  private brandsUrlGCP = "http://35.193.88.251/v1/data/brands";
  private brandsUrlAzure = "http://52.149.205.209/v1/data/brands";
  private carModelsUrlAzure = "http://52.149.205.209/v1/data/cars/";
  private carModelsUrlGCP = "http://35.193.88.251/v1/data/cars/";
  //private brandsUrlGCPSSE = "http://35.193.88.251/v1/data/brands-sse";
  //private eventSource!: EventSource;
  //carBrands: CarBrand[] = [];

  // /**
  //  * Observable to get the brands' names.
  //  */
  getBrandsName = this.brandsName.asObservable();

  /**
   * Creates an instance of CarsListService.
   * @param {HttpClient} http - The HttpClient service to make HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Method to fetch data from the mock API based on the provided page number.
   * @param {number} pageNumber - The page number to fetch data for.
   * @returns {Observable<any>} An Observable that emits the data fetched from the API.
   */
  getData(pageNumber: number): Observable<any> {
    const url = `${this.carModelsUrlGCP}&page_number=${pageNumber}`;
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
  getCarBrands(selectedCloud: string): Observable<CarBrand[]> {
    if (selectedCloud === "gcp")
      return this.http.get<CarBrand[]>(this.brandsUrlGCP);
    else return this.http.get<CarBrand[]>(this.brandsUrlAzure);
  }

  getCarModels(
    selectedCloud: string,
    carBrandName: string,
  ): Observable<CarDetails[]> {
    if (selectedCloud === "gcp")
      return this.http.get<CarDetails[]>(
        this.carModelsUrlGCP.concat(carBrandName),
      );
    else
      return this.http.get<CarDetails[]>(
        this.carModelsUrlAzure.concat(carBrandName),
      );
  }

  // getCarModelsAzure(carBrandName: string): Observable<CarDetails[]> {
  //   return this.http.get<CarDetails[]>(
  //     this.carModelsUrlAzure.concat(carBrandName),
  //   );
  // }
  // subscribeToCarData(): Observable<CarBrand> {
  //   const url = this.brandsUrlGCPSSE; // Replace with your actual URL
  //
  //   this.eventSource = new EventSource(url);
  //
  //   return new Observable<CarBrand>((observer) => {
  //     this.eventSource.onmessage = (event) => {
  //       const carData = JSON.parse(event.data);
  //
  //       const carBrands: CarBrand = {
  //         brand: carData.brand,
  //       };
  //
  //       this.carBrands.push(carBrands);
  //       observer.next(carBrands);
  //     };
  //
  //     this.eventSource.onerror = (error) => {
  //       observer.error(error);
  //     };
  //
  //     return () => {
  //       this.eventSource.close();
  //     };
  //   });
  // }
}
