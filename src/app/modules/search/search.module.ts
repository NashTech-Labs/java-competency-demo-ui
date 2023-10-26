import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { CarSearchResultComponent } from './car-search-result/car-search-result.component';
import {DashboardModule} from "../../dashboard/dashboard.module";


@NgModule({
  declarations: [
    CarSearchResultComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    DashboardModule
  ]
})
export class SearchModule { }
