import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { CarBrandsComponent } from "./car-brands/car-brands.component";
import { CarsListComponent } from "./cars-list/cars-list.component";
import { DataNotFoundComponent } from "./data-not-found/data-not-found.component";
import { HomeComponent } from "./home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { MaterialModule } from "../shared/module/material.module";
import { HomeRoutingModule } from "./home-routing.module";
import { CarsdataCardComponent } from "./cars-list/carsdata-card/carsdata-card.component";
import { PaginationComponent } from "./pagination/pagination.component";
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";

@NgModule({
  declarations: [
    CarBrandsComponent,
    CarsListComponent,
    DataNotFoundComponent,
    PageNotFoundComponent,
    HomeComponent,
    CarsdataCardComponent,
    PaginationComponent,
  ],
    imports: [CommonModule, HomeRoutingModule, MaterialModule, NgOptimizedImage, MatLegacyChipsModule],
  exports: [HomeComponent],
})
export class HomeModule {}
