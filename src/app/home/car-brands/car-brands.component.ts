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
  data: Array<any> = BrandsList;
  brandsName: string = "";
  constructor(private homeService: HomeService) {
    this.homeService.getBrandsName.subscribe(
      (name) => (this.brandsName = name),
    );
  }

  ngOnInit(): void {}

  onButtonClick(name: string) {
    this.homeService.setBrandsName(name);
  }
}
