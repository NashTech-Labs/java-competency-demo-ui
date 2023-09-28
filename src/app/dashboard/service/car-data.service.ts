import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarDataService {
    constructor(private http: HttpClient) {
  }

  brandsurl: string = "assets/data/brands.json";
 // url = "https://my.api.mockaroo.com/car_schema.json?key=e579fe10";
  url =  "assets/data/cardata.json";
  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getBrands() : Observable<string []> {
    return this.http.get<string[]>(this.brandsurl);

  }
}
