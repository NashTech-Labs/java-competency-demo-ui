import { Component } from "@angular/core";
import { constants } from "src/app/constants/constants";
import { CartService } from "../../service/cart.service";

/**
 * Header for the dashboard.
 */
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  /**
   * Creates an instance of HeaderComponent.
   * @param {CartService} cartService - The cart service for managing the shopping cart.
   */
  constructor(public cartService: CartService) {}
  /** The title to be displayed in the header. */
  title: string = "Java UI Demo";
  /** The number of items in the shopping cart. */
  cartItemCount: number = 0;
  /** The URL for the NashTech logo. */
  nashTechLogoUrl: string = constants.nashTechLogoUrl;
}
