import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { HeaderComponent } from "./components/header/header.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { MaterialModule } from "../shared/module/material.module";
import { ApiErrorComponent } from "./components/api-error/api-error.component";
import { ServerErrorComponent } from "./components/server-error/server-error.component";
@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidenavComponent,
    ApiErrorComponent,
    ServerErrorComponent,
  ],
  exports: [HeaderComponent, ApiErrorComponent],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule],
})
export class DashboardModule {}
