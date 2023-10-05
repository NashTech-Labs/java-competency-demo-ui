import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarDataService {
    constructor(private http: HttpClient) {
  }

  brandsurl: string = "http://35.193.88.251/v1/data/brands";
  url =  "assets/data/cardata.json";
  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getBrands() : Observable<string []> {
    return this.http.get<string[]>(this.brandsurl);

  }
}
