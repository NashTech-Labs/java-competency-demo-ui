import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { CartService } from "../../../dashboard/service/cart.service";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-action-column",
  templateUrl: "./action-column.component.html",
  styleUrls: ["./action-column.component.scss"],
})
export class ActionColumnComponent implements ICellRendererAngularComp {
  constructor(
    private cartService: CartService,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
  ) {}

  public bulkEventCellValue!: any;
  eventId!: string;
  updatedValue!: string;

  agInit(params: ICellRendererParams): void {
    this.bulkEventCellValue = params;
  }

  refresh(params: ICellRendererParams) {
    this.bulkEventCellValue = params;
    return true;
  }

  addToCart(): void {
    const url =
      "http://localhost:8081/cart/add?productId=prod1&quantity=2&userId=user1";
    this.httpClient.post<any>(url, null).subscribe((response) => {
      if (response.success) {
        this.cartService.incrementCartItemCount();
      } else {
        console.error("Failed to add to cart:", response.message);
      }
    });
  }

  addToCartTest() {
    this.cartService.incrementCartItemCount();
    this.showSnackBar("Item has been added to the cart");
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, "Close", {
      duration: 3000,
    });
  }
}
