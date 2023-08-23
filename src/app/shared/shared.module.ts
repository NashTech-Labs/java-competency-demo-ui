import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TabularViewComponent } from './components/tabular-view/tabular-view.component';
import { TableHeadersDropdownComponent } from './components/table-headers-dropdown/table-headers-dropdown.component';

@NgModule({
  declarations: [
    TabularViewComponent,
    TableHeadersDropdownComponent
  ],
  imports: [CommonModule],
})
export class SharedModule {}
