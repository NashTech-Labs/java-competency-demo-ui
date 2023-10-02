import { Component, Input, ViewChild } from "@angular/core";
import { ColDef } from "ag-grid-community";
import { AgGridAngular } from "ag-grid-angular";
import { CarDataService } from "../../../dashboard/service/car-data.service";
import { CarDetailsService } from "../../services/car-details.service";
import { Subscription } from "rxjs";
import { ActionColumnComponent } from "../action-column/action-column.component";
import { FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-tabular-view",
  templateUrl: "./tabular-view.component.html",
  styleUrls: ["./tabular-view.component.scss"],
})
export class TabularViewComponent {
  @Input() tableRows: any;
  @Input() tableHeaders: ColDef[] = [];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
    suppressMenu: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
  };

  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
  };

  page!: string;
  public overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  public overlayNoRowsTemplate =
    "<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">This is a custom 'no rows' overlay</span>";

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor() {}

  ngOnInit() {}

  pagination: boolean = true;
}
