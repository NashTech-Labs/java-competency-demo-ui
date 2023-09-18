import { Component } from '@angular/core';
import { constants } from "src/app/constants/constants";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  })
export class HeaderComponent {
  cartItemCount: number = 0;
  nashTechLogoUrl: string = constants.nashTechLogoUrl;

}
