import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CardService {
  private readonly apiKey = "c8f844d0"; // API key to access the mock API data.
  private readonly apiUrl = "https://my.api.mockaroo.com/jitin_cars_data.json"; // URL of the mock API endpoint.

  constructor(private http: HttpClient) {}

  // Method to fetch data from the mock API based on the provided page number.
  getData(pageNumber: number) {
    const url = `${this.apiUrl}?key=${this.apiKey}&page_number=${pageNumber}`;
    return this.http.get(url);
  }
}
