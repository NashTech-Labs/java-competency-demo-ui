import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TabularViewComponent } from "./components/tabular-view/tabular-view.component";
import { MaterialModule } from "./module/material.module";
import { AgGridModule } from "ag-grid-angular";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActionColumnComponent} from "./components/action-column/action-column.component";
import {TableHeadersDropdownComponent} from "./components/table-headers-dropdown/table-headers-dropdown.component";

@NgModule({
  declarations: [TabularViewComponent,ActionColumnComponent,TableHeadersDropdownComponent],
    imports: [CommonModule, MaterialModule, AgGridModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  exports: [TabularViewComponent,ActionColumnComponent],
})
export class SharedModule {}
