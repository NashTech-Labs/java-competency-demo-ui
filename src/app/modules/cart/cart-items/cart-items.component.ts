import { Component, Input } from "@angular/core";
import { CartItem } from "../../../shared/module/cart-item.model";

@Component({
  selector: "app-cart-items",
  templateUrl: "./cart-items.component.html",
  styleUrls: ["./cart-items.component.scss"],
})
export class CartItemsComponent {
  @Input() cartItem!: CartItem;
}
