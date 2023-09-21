import { Component } from '@angular/core';
import { constants } from "src/app/constants/constants";
import {CartService} from "../../service/cart.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  })
export class HeaderComponent {
  constructor(public cartService : CartService) {
  }
  cartItemCount: number = 0;
  nashTechLogoUrl: string = constants.nashTechLogoUrl;
}
