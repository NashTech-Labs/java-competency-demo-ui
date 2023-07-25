import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
  export class CardService {

  private readonly apiKey = 'c8f844d0';
  private readonly apiUrl = 'https://my.api.mockaroo.com/jitin_cars_data.json';

  constructor(private http: HttpClient) {
  }


  getData(pageNumber: number) {
    const url = `${this.apiUrl}?key=${this.apiKey}&page_number=${pageNumber}`;
    return this.http.get(url);
  }

}
