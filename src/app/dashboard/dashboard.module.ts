import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {  MaterialModule } from '../shared/module/material.module';



@NgModule({
  declarations: [
    DashboardComponent,
    SidenavComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
    ]
})
export class DashboardModule {
}
