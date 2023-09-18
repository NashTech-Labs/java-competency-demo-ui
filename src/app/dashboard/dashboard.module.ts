import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { HeaderComponent } from "./components/header/header.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { MaterialModule } from "../shared/module/material.module";
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {CloudOptionsModule} from "../modules/cloud-options/cloud-options.module";
import {SharedModule} from "../shared/shared.module";
@NgModule({
  declarations: [DashboardComponent, HeaderComponent, SidenavComponent],
      imports: [CommonModule, DashboardRoutingModule, MaterialModule, CloudOptionsModule, SharedModule, MatBadgeModule, MatButtonModule, MatIconModule],
})
export class DashboardModule {}
