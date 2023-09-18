import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TabularViewComponent } from "./components/tabular-view/tabular-view.component";
import { MaterialModule } from "./module/material.module";
import { AgGridModule } from "ag-grid-angular";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {ActionColumnComponent} from "./components/action-column/action-column.component";

@NgModule({
  declarations: [TabularViewComponent,ActionColumnComponent],
    imports: [CommonModule, MaterialModule, AgGridModule, MatSelectModule, FormsModule],
  exports: [TabularViewComponent,ActionColumnComponent],
})
export class SharedModule {}
