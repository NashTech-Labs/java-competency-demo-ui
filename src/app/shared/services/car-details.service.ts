import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CarBrand, CarDetails } from "../module/cars-details.model";

@Injectable({
  providedIn: "root",
})
export class CarDetailsService {
  private brandsUrlGCP = "http://35.193.88.251/v1/data/brands";
  private brandsUrlAzure = "http://52.149.205.209/v1/data/brands";
  private carModelsUrlAzure = "http://52.149.205.209/v1/data/cars/";
  private carModelsUrlGCP = "http://35.193.88.251/v1/data/cars/";
  //private brandsUrlGCPSSE = "http://35.193.88.251/v1/data/brands-sse";
  //private eventSource!: EventSource;
  //carBrands: CarBrand[] = [];
  constructor(private http: HttpClient) {}

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
