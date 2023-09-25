import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import {CartService} from "../../../dashboard/service/cart.service";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: "app-action-column",
  templateUrl: "./action-column.component.html",
  styleUrls: ["./action-column.component.scss"],
})
export class ActionColumnComponent implements ICellRendererAngularComp {

  constructor(private cartService : CartService , private httpClient : HttpClient,
              private snackBar : MatSnackBar) {
  }

  selectedAction: string ='Organized Crime';
  bulkEventActions = [
    { icon: "assets/svg/OC.svg", name: "Organized Crime" },
    { icon: "assets/svg/ET.svg", name: "External Theft" },
    { icon: "assets/svg/EMP.svg", name: "Employee" },
    { icon: "assets/svg/OS.svg", name: "Omni Sale" },
    { icon: "assets/svg/NaLE.svg", name: "Transfer" },
    { icon: "assets/svg/Transfer.svg", name: "Others" },
    { icon: "assets/svg/Others.svg", name: "Not a loss Event" },
    { icon: "assets/svg/Mixed.svg", name: "Mixed" },
  ];
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

  addToCart(productId: string, quantity: number, userId: string): void {
    this.httpClient.post<any>('http://localhost:8081/cart/add', {
      productId: productId,
      quantity: quantity,
      userId: userId
    }).subscribe(response => {
      if (response.success) {
        console.log("response is" , response);
        this.cartService.incrementCartItemCount();
      } else {
        console.error('Failed to add to cart:', response.message);
      }
    });
  }

  addToCartTest (){
    this.cartService.incrementCartItemCount();
    this.showSnackBar("Item has been added to the cart");
  }

  private showSnackBar (message : string){
    this.snackBar.open(message , 'Close' , {
      duration: 3000,
    });
    }

}
