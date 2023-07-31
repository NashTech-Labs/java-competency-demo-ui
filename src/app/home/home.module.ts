import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarBrandsComponent } from './car-brands/car-brands.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { DataNotFoundComponent } from './data-not-found/data-not-found.component';
import { HomeComponent } from "./home.component";
import {  MaterialModule } from '../shared/module/material.module';

import { HomeRoutingModule } from './home-routing.module';


@NgModule({
    declarations: [CarBrandsComponent,
        CarsListComponent,
        DataNotFoundComponent,
        HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MaterialModule
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule { }
