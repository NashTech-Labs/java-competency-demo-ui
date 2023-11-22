import { Component } from "@angular/core";
import {CartService} from "../../../shared/services/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ICellRendererParams} from "ag-grid-community";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-car-search-result",
  templateUrl: "./car-search-result.component.html",
  styleUrls: ["./car-search-result.component.scss"],
})
export class CarSearchResultComponent {
  constructor(    private cartService: CartService,
                  private snackBar: MatSnackBar,
                  private route : ActivatedRoute

  ) {
  }
  carsData: CarDetails1[] = [];
  page: number = 1;
  itemsPerPage: number = 5;
  selectedCategory: string = 'All';
  searchTerm: string = '';
  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.selectedCategory = queryParams['category'] || 'All';
      this.searchTerm = queryParams['term'] || '';
    this.getAllSearchedCars();
  });
  }

  public bulkEventCellValue!: any;
  public carId!: string;

  agInit(params: ICellRendererParams): void {
    this.bulkEventCellValue = params;
    this.carId = params.data.carId;
  }
  addToCart(): void {
    this.cartService.addToCart(this.carId).subscribe((response) => {
      if (response != null) {
        this.cartService.incrementCartItemCount();
        this.showSnackBar("Item has been added to the cart");
      } else {
        console.error("Failed to add to cart:");
      }
    });
  }
  private showSnackBar(message: string) {
    this.snackBar.open(message, "Close", {
      duration: 3000,
    });
  }

  getAllSearchedCars() {
    if (this.selectedCategory === 'Id') {
      this.cartService.searchCarsById(this.searchTerm).subscribe((response) => {
        console.log(response);
        if (!Array.isArray(response) && response != null) {
          this.carsData = [response];
        } else {
          this.carsData = response;
        }
      });
    } else if (this.selectedCategory === 'Brand') {
      this.cartService.searchCarsByBrand(this.searchTerm).subscribe((response) => {
        this.carsData = response;

      });
    } else if (this.selectedCategory === 'Price') {
      this.cartService.searchCarsByPrice(this.searchTerm).subscribe((response) => {
        this.carsData = response;
      });
    } else if (this.selectedCategory === 'Mileage') {
      this.cartService.searchCarsByMileage(this.searchTerm).subscribe((response) => {
        this.carsData = response;
      });
    }
    else{
      this.cartService.searchAllCars().subscribe((response) => {
        this.carsData = response;
      });    }
  }
}


interface CarDetails1 {
  brand_id: number;
  brand_name: string;
  carId : number;
  model: string;
  year: number;
  color: string;
  mileage: number;
  price: string;
  location: string;
}
