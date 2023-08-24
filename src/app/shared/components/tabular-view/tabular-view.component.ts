import {Component, ViewChild} from '@angular/core';
import {ColDef} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {Router} from "@angular/router";
import {MatSelect} from "@angular/material/select";
import {ShrinkAnalyzerService} from "../../../dashboard/service/shrink-analyzer.service";

@Component({
  selector: 'app-tabular-view',
  templateUrl: './tabular-view.component.html',
  styleUrls: ['./tabular-view.component.scss']
})
export class TabularViewComponent {

  tableRows: any;
  tableHeaders: ColDef[] = [];
  selectedColumns: string[] = [];
  columnIds: string[] = [];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
    suppressMenu: true,
    wrapHeaderText: true,
    autoHeaderHeight: true
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
  };
  public overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  public overlayNoRowsTemplate =
      '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">This is a custom \'no rows\' overlay</span>';

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private router: Router, private shrinkService:ShrinkAnalyzerService){}

  ngOnInit() {
    this.shrinkService.getData().subscribe(
        response =>{
            this.tableRows = response;
            console.log("component se response", this.tableRows);

          if (this.tableRows.length > 0) {
            this.tableHeaders = Object.keys(this.tableRows[0]).map(key => ({
              headerName: key,
              field: key
            }));
          }

        },

    )


    this.columnIds = this.tableHeaders
        .filter((header) => header.colId !== undefined)
        .map((header) => header.colId as string);
  }

  onColumnSelectionChange(event: any, matSelect: MatSelect) {
    const newSelectedColumns = event.value;

    if (newSelectedColumns.length >= 2) {
      this.columnIds = newSelectedColumns;
      const columnIds = this.tableHeaders
          .filter((header) => header.colId !== undefined)
          .map((header) => header.colId as string);
      this.agGrid.columnApi.setColumnsVisible(columnIds, false);
      this.agGrid.columnApi.setColumnsVisible(this.columnIds, true);
    } else {
      const columnsToKeep = this.tableHeaders
          .filter((header) => this.columnIds.includes(header.colId as string))
          .map((header) => header.colId as string);
      matSelect.writeValue(columnsToKeep);
    }
  }

  onCellClicked( data: any, column : string | undefined): void {
    let value;
    if(data.hasOwnProperty('day-of-week')){
      value = {day:data['day-of-week']};
    }
    else if(data.hasOwnProperty('hour-of-day')){
      value = {hour:data['hour-of-day']};
    }
    else if(data.hasOwnProperty('site-code')){
      value = {'site-code':data['site-code']};
    }

    if(column === 'bulkEventCount'){
      this.router.navigate(['/dashboard/bulk-shrink-events'],{ queryParams: {
          ...value,
          bulkEvent: data['bulk-event-count'],
        }});
    }else if(column === 'sweetheartCount' ){
      this.router.navigate(['/dashboard/rfid-exit-read'],{ queryParams: {
          ...value,
          sweetheart: data['sweetheart-count'],
        }});
    } else if(column === 'totalShrinkEvents' ){
      this.router.navigate(['/dashboard/rfid-exit-read'],{ queryParams: {
          ...value,
          totalShrinkItem: data['shrink-event-count'],
        }});
    }
    else if(column === 'siteId' ){
      this.router.navigate(['/dashboard/rfid-exit-read'],{ queryParams: {
          ...value,
          totalShrinkItem: data['siteId'],
        }});
    }
    else if(column === 'BulkID' ){
      this.router.navigate(['/dashboard/rfid-exit-read'],{ queryParams: {
          'date-and-time': data['Event Time'],
          'exit-door-id': data['Exit Door ID'],
          'event-id': data['Event ID'],
        }});
    }
  }

}
