import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import {CartService} from "../../../dashboard/service/cart.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: "app-action-column",
  templateUrl: "./action-column.component.html",
  styleUrls: ["./action-column.component.scss"],
})
export class ActionColumnComponent implements ICellRendererAngularComp {

  constructor(private cartService : CartService , private httpClient : HttpClient) {
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

  addToCart(cartId: number, quantity: number, userId: number): void {
    // Call the API to add to the cart
    this.httpClient.post<any>('http://localhost:8081/api/cart/add', {
      cartId: cartId,
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

}
