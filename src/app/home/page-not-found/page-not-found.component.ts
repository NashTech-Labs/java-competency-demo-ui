import { Component } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-data-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class DataNotFoundComponent {
  constructor(private router: Router) {}

  goToDashboard() {
    this.router.navigate(['/home']);
  }
}
