import {Component, ViewChild} from '@angular/core';
import {ColDef, ColGroupDef} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {Router} from "@angular/router";
import { Subscription } from 'rxjs';
import { ActionColumnComponent } from '../action-column/action-column.component';
import {FormControl} from "@angular/forms";
import {CarDetailsService} from "../../services/car-details.service";
import {CarBrand} from "../../module/cars-details.model";

@Component({
  selector: 'app-tabular-view',
  templateUrl: './tabular-view.component.html',
  styleUrls: ['./tabular-view.component.scss']
})
export class TabularViewComponent {

  tableHeaders: ColDef[] = [];
  isLoading = false;
  carColumnDef: (ColDef | ColGroupDef)[] = [];
  updatedCarHeaders: any[] = [];
  allTableHeaders: any[] = [];
  carDataSubscription$!: Subscription;
  carData: any[] = [];
  filteredCarData : any [] = [];
  carBrands : string[] = [];
  carBrandsData: any[]=[];
  selectedCarBrand!: string;
  carBrandControl = new FormControl();
  selectedTab! : string;
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
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

  constructor(private router: Router, private carDetailsService:CarDetailsService){}

  ngOnInit() {
    if (this.router.url.includes('/dashboard')){
      this.selectedTab = 'azure';}
    else{
      this.selectedTab = 'gcp'
    }
    this.getCarBrands();
  }

  pagination: boolean = true;
  paginationPageSize: number = 10;


  getCarData(selectedCarBrands : string) {
    this.isLoading = true;
    this.carDataSubscription$ = this.carDetailsService
        .getCarModels(this.selectedTab,selectedCarBrands)
        .subscribe((res) => {
          if (res) {
            this.carColumnDef = [
              {field: 'carId', headerName:('Brand_Id'),  colId: 'carId',minWidth:180, filter: 'agTextColumnFilter', suppressMenu: true, unSortIcon: true},
              {field: 'brand', headerName: ('Brand_Name'), colId: 'brand', minWidth:210, filter: 'agTextColumnFilter', suppressMenu: true, unSortIcon: true},
              {field: 'model', headerName: ('Model'), colId: 'model', filter: 'agTextColumnFilter', suppressMenu: true, unSortIcon: true},
              {field: 'year', headerName: ('Year'), colId: 'year', filter: 'agTextColumnFilter', suppressMenu: true, unSortIcon: true},
              {field: 'color', headerName: ('Color'), colId: 'color',minWidth:210, filter: 'agTextColumnFilter', suppressMenu: true, unSortIcon: true},
              {field: 'price', headerName: ('Price'), colId: 'price',minWidth:210, filter: 'agTextColumnFilter', suppressMenu: true, unSortIcon: true},
              {field: 'mileage', headerName: ('Mileage'), colId: 'mileage', filter: 'agTextColumnFilter', suppressMenu: true, unSortIcon: true},
              {field: 'Action', headerName: ('Action'), colId: 'Action',cellRenderer: ActionColumnComponent, floatingFilter: false}
            ]

            this.carData = res.map(item => {
              return { ...item, ...this.carColumnDef };
            });

            console.log("data is " , this.carData);

            this.carData = res;
            this.filteredCarData = this.carData;

            this.updatedCarHeaders = this.carColumnDef;
            this.allTableHeaders = this.carColumnDef;
          }
          this.isLoading = false;
        });
  }


  getCarBrands() {
    this.isLoading = true;

    this.carDetailsService.getCarBrands(this.selectedTab).subscribe(
        (brands: CarBrand[]) => {
          this.carBrandsData = [...brands];
          this.carBrandsData.forEach((item :any) => {
            this.carBrands.push(item.brand);
          });
          const firstSelectedBrand = this.carBrands[0];
          this.carBrandControl.setValue(firstSelectedBrand);
          this.getCarData(firstSelectedBrand);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching car brands', error);
          this.isLoading = false;
        }
    );
  }
  setHeadersForBulkShrink(event: any){
    this.updatedCarHeaders = [];
    this.updatedCarHeaders = this.setTableHeaders(event, this.allTableHeaders);
    this.carColumnDef = this.updatedCarHeaders;
  }

  setTableHeaders(event: any, tableHeaders: ColDef[]): ColDef<any>[]{
    let updatedHeaders: ColDef<any>[] = [];
    if(event.length > 0){
      tableHeaders.forEach((item:ColDef) => {
        if(event.includes(item.colId)){
          updatedHeaders.push(item);
        }
      });
    }
    return updatedHeaders;
  }

  setTableDataForSelectedBrands() {
    console.log("selected car brand " + this.selectedCarBrand);
    console.log("here car data is  " + this.carData);
    this.selectedCarBrand = this.carBrandControl.value;
    this.getCarData(this.selectedCarBrand);
  }

  onCarBrandSelectionChange(event: any) {
    this.selectedCarBrand = event.value;
    this.setTableDataForSelectedBrands();
  }

}
