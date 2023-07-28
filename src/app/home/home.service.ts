import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  private brandsName = new BehaviorSubject<string>("");
  getBrandsName = this.brandsName.asObservable();

  constructor() {}

  setBrandsName(brandsName: string) {
    this.brandsName.next(brandsName);
  }
}
