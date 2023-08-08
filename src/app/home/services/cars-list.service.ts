import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {CarsDetails} from "../../shared/module/cars-details.model";

/**
 * Service responsible for handling data related to the cars list.
 */
@Injectable({
    providedIn: "root",
})
export class CarsListService {
    private brandsName = new BehaviorSubject<string>("");
    private apiUrl =
        "\n" + "https://my.api.mockaroo.com/rahul_kumar_sinha.json?key=d64d48c0";
    private apiUrlBrand =
        "\n" + "https://my.api.mockaroo.com/rahul_kumar_sinha.json?key=d64d48c0";
    // private apiUrlBrand =
    //     "\n" + "http://34.71.93.66/v1/data/brands";

    /**
     * Observable to get the brands' names.
     */
    getBrandsName = this.brandsName.asObservable();

    /**
     * Creates an instance of CarsListService.
     * @param {HttpClient} http - The HttpClient service to make HTTP requests.
     */
    constructor(private http: HttpClient) {
    }

    /**
     * Method to fetch data from the mock API based on the provided page number.
     * @param {number} pageNumber - The page number to fetch data for.
     * @returns {Observable<any>} An Observable that emits the data fetched from the API.
     */
    getData(): Observable<any> {
        return this.http.get(this.apiUrl);
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
    getBrandName(): Observable<CarsDetails[]> {
        return this.http.get<CarsDetails[]>(this.apiUrlBrand);
    }
}
