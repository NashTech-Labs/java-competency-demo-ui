import { Component, OnInit } from "@angular/core";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { CommonService } from "../../../shared/services/common.service";
import { Subscription } from "rxjs";
import { CarDetailsService } from "../../../shared/services/car-details.service";
import { constants } from "../../../constants/constants";
import { CarBrand } from "../../../shared/module/cars-details.model";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { ActionColumnComponent } from "../../../shared/components/action-column/action-column.component";

@Component({
  selector: "app-cars-data",
  templateUrl: "./cars-data.component.html",
  styleUrls: ["./cars-data.component.scss"],
})
export class CarsDataComponent implements OnInit {
  carColumnDef: (ColDef | ColGroupDef)[] = [];
  allTableHeaders: any[] = [];
  updatedCarHeaders: any[] = [];
  isLoading = false;
  // carModelsData: CarsData[] = [];
  carBrands: CarBrand[] = [];
  carDataSubscription$!: Subscription;
  selectedCloud: string = constants.defaultCloud;
  carBrandControl = new FormControl();
  selectedCarBrand!: string;
  carData: any[] = [];
  constructor(
    public commonService: CommonService,
    private carsDataService: CarDetailsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes("gcp")) {
      this.selectedCloud = "gcp";
    }
    this.getCarBrands(this.selectedCloud);
  }
  setHeadersForCarsData(event: any) {
    this.updatedCarHeaders = [];
    this.updatedCarHeaders = this.commonService.setTableHeaders(
      event,
      this.allTableHeaders,
    );
    this.carColumnDef = this.updatedCarHeaders;
  }

  getCarBrands(selectedCloud: string) {
    this.isLoading = true;
    this.carsDataService.getCarBrands(selectedCloud).subscribe((brands) => {
      this.carBrands = brands;
      const preSelectedBrand = this.carBrands[0].brand;
      this.carBrandControl.setValue(preSelectedBrand);
      this.getCarModels(selectedCloud, preSelectedBrand);
      this.isLoading = false;
    });
  }

  getCarModels(selectedCloud: string, brand: string) {
    this.isLoading = true;
    this.carDataSubscription$ = this.carsDataService
      .getCarModels(selectedCloud, brand)
      .subscribe((res) => {
        if (res) {
          this.carColumnDef = [
            {
              field: "carId",
              headerName: "Car Id",
              colId: "carId",
              minWidth: 180,
              filter: "agTextColumnFilter",
              suppressMenu: true,
              unSortIcon: true,
            },
            {
              field: "brand",
              headerName: "Brand",
              colId: "brand",
              minWidth: 210,
              filter: "agTextColumnFilter",
              suppressMenu: true,
              unSortIcon: true,
            },
            {
              field: "model",
              headerName: "Model",
              colId: "model",
              filter: "agTextColumnFilter",
              suppressMenu: true,
              unSortIcon: true,
            },
            {
              field: "year",
              headerName: "Year",
              colId: "year",
              filter: "agTextColumnFilter",
              suppressMenu: true,
              unSortIcon: true,
            },
            {
              field: "color",
              headerName: "Color",
              colId: "color",
              minWidth: 210,
              filter: "agTextColumnFilter",
              suppressMenu: true,
              unSortIcon: true,
            },
            {
              field: "price",
              headerName: "Price",
              colId: "price",
              minWidth: 210,
              filter: "agTextColumnFilter",
              suppressMenu: true,
              unSortIcon: true,
            },
            {
              field: "mileage",
              headerName: "Mileage",
              colId: "mileage",
              filter: "agTextColumnFilter",
              suppressMenu: true,
              unSortIcon: true,
            },
            {
              field: "Action",
              headerName: "Action",
              colId: "Action",
              cellRenderer: ActionColumnComponent,
              floatingFilter: false,
            },
          ];
          this.carData = res;
          this.updatedCarHeaders = this.carColumnDef;
          this.allTableHeaders = this.carColumnDef;
        }
        this.isLoading = false;
      });
  }

  onCarBrandSelectionChange(event: any) {
    this.selectedCarBrand = event.value;
    this.getCarModels(this.selectedCloud, this.selectedCarBrand);
  }

  addBulkData() {
    this.carsDataService
      .addBulkData()
      .subscribe((data) => console.log("Bulk data uploaded successfully."));
  }
}