import { Component } from "@angular/core";
import { BrandsList } from "../../../../assets/data/brandsListJson";
import {CartService} from "../../../shared/services/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: "app-car-search-result",
  templateUrl: "./car-search-result.component.html",
  styleUrls: ["./car-search-result.component.scss"],
})
export class CarSearchResultComponent {
  constructor(    private cartService: CartService,
                  private snackBar: MatSnackBar,

  ) {
  }
  carsData: CarDetails1[] = [];
  ngOnInit() {
    this.carsData = BrandsList;
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
}

interface CarDetails1 {
  brand_id: number;
  brand_name: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  price: string;
  location: string;
}
