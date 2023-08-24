import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TabularViewComponent } from "./components/tabular-view/tabular-view.component";
import { TableHeadersDropdownComponent } from "./components/table-headers-dropdown/table-headers-dropdown.component";
import { MaterialModule } from "./module/material.module";
import { AgGridModule } from "ag-grid-angular";
@NgModule({
  declarations: [TabularViewComponent, TableHeadersDropdownComponent],
  imports: [CommonModule, MaterialModule, AgGridModule],
  exports: [TabularViewComponent, TableHeadersDropdownComponent],
})
export class SharedModule {}
