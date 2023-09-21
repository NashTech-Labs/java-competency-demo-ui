import {Component, ViewChild} from '@angular/core';
import {ColDef, ColGroupDef} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {Router} from "@angular/router";
import {MatSelect} from "@angular/material/select";
import {ShrinkAnalyzerService} from "../../../dashboard/service/shrink-analyzer.service";
import { Subscription } from 'rxjs';
import { ActionColumnComponent } from '../action-column/action-column.component';

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
  isLoading = false;

  carDataSubscription$!: Subscription;
  carData: string[] = [];

  carColumnDef: ColDef [] = [];

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
    this.getCarData();
  }

  // Add this property for pagination
  pagination: boolean = true;

  // Add this property for setting the number of rows per page
  paginationPageSize: number = 10;


  onColumnSelectionChange(event: any, matSelect: MatSelect) {
    const newSelectedColumns = event.value;
     console.log(event.value);
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

  getCarData() {
    this.isLoading = true;
    this.carDataSubscription$ = this.shrinkService
      .getData()
      .subscribe((res) => {
        if (res) {
          this.carColumnDef = [
            {field: 'brand_id', headerName:('Brand_Id'),  colId: 'brand_id',minWidth:180, filter: 'agTextColumnFilter', suppressMenu: true, unSortIcon: true},
            {field: 'brand_name', headerName: ('Brand_Name'), colId: 'brand_name', minWidth:210, filter: 'agTextColumnFilter', suppressMenu: true, unSortIcon: true},
            {field: 'model', headerName: ('Model'), colId: 'model', filter: 'agTextColumnFilter', suppressMenu: true, unSortIcon: true},
            {field: 'year', headerName: ('Year'), colId: 'year', filter: 'agTextColumnFilter', suppressMenu: true, unSortIcon: true},
            {field: 'color', headerName: ('Color'), colId: 'color',minWidth:210, filter: 'agTextColumnFilter', suppressMenu: true, unSortIcon: true},
            {field: 'mileage', headerName: ('Mileage'), colId: 'mileage', filter: 'agTextColumnFilter', suppressMenu: true, unSortIcon: true},
            {field: 'price', headerName: ('Price'), colId: 'price',minWidth:210, filter: 'agTextColumnFilter', suppressMenu: true, unSortIcon: true},
            {field: 'location', headerName: ('Location'), colId: 'location', filter: 'agTextColumnFilter', suppressMenu: true, unSortIcon: true},
            {field: 'Action', headerName: ('Action'), colId: 'Action',cellRenderer: ActionColumnComponent, floatingFilter: false}
          ]

          this.carData = res.map(item => {
            return { ...item, ...this.carColumnDef };
          });
        }
        
        this.isLoading = false;
      });
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
