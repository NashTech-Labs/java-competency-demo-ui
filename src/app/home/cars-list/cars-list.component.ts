import { Component, OnInit} from "@angular/core";
import { HomeService } from "../home.service";

@Component({
  selector: "app-cars-list",
  templateUrl: "./cars-list.component.html",
  styleUrls: ["./cars-list.component.scss"],
})
export class CarsListComponent implements OnInit{

  brandsName:string="hello ankit";
  constructor(private homeService:HomeService){
    
  }
  ngOnInit(): void {
    this.homeService.getBrandsName.subscribe(msg => this.brandsName = msg);
  }
}
