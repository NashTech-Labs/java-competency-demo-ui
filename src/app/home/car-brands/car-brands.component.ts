import { Component, OnInit } from "@angular/core";
import { BrandsList } from "src/assets/data/brandsListJson";
import { HomeService } from "../home.service";
import { CarsDetails } from "src/app/shared/module/cars-details.model";

@Component({
  selector: "app-car-brands",
  templateUrl: "./car-brands.component.html",
  styleUrls: ["./car-brands.component.scss"],
})
export class CarBrandsComponent implements OnInit {
  data: Array<CarsDetails> = BrandsList;
  brandsName: string = "";
  constructor(private homeService: HomeService) {
    this.homeService.getBrandsName.subscribe(
      (name) => (this.brandsName = name),
    );
  }

  ngOnInit(): void {}
  
  /**
   * Sends Selected Brands Name to CarsListComponent
   * @param name : name of selected car brand
   */
  onBrandClick(name: string) {
    this.homeService.setBrandsName(name);
  }
}
