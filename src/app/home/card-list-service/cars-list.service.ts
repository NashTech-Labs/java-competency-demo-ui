import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {CarsDetails} from "../../shared/module/cars-details.model";

@Injectable({
  providedIn: 'root'
})
export class CarsListService {
  private brandsName = new BehaviorSubject<string>("");
  private readonly apiKey = "c8f844d0"; // API key to access the mock API data.
  private readonly apiUrl = "https://my.api.mockaroo.com/jitin_cars_data.json"; // URL of the mock API endpoint.

  private  apiUrlBrand = "https://my.api.mockaroo.com/model_random.json?key=dcbc8750";

  getBrandsName = this.brandsName.asObservable();

  constructor(private http: HttpClient) {}

  // Method to fetch data from the mock API based on the provided page number.
  getData(pageNumber: number) {
    const url = `${this.apiUrl}?key=${this.apiKey}&page_number=${pageNumber}`;
    return this.http.get(url);
  }

  setBrandsName(brandsName: string) {
    this.brandsName.next(brandsName);
  }

  getBrandName(): Observable<CarsDetails[]> {
    return this.http.get<CarsDetails[]>(this.apiUrlBrand);
  }
}

