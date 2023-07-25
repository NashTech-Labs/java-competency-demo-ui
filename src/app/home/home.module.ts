import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarBrandsComponent } from './car-brands/car-brands.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { DataNotFoundComponent } from './data-not-found/data-not-found.component';
import { HomeComponent } from "./home.component";
import {  MaterialModule } from '../shared/module/material.module';

import { HomeRoutingModule } from './home-routing.module';
import { CarsdataCardComponent } from './cars-list/carsdata-card/carsdata-card.component';
import {HttpClientModule} from "@angular/common/http";
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [CarBrandsComponent,
    CarsListComponent,
    DataNotFoundComponent,
    HomeComponent,
    CarsdataCardComponent,
    PaginationComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
})
export class HomeModule { }
