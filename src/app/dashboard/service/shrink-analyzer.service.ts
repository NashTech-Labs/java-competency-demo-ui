import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShrinkAnalyzerService {

    constructor(private http: HttpClient) {
  }

  url = "https://my.api.mockaroo.com/car_schema.json?key=e579fe10";
  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

}
