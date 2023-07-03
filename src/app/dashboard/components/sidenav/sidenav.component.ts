import { Component } from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  isMenuOpen = true;
  arrowIcon: string='keyboard_double_arrow_left';
  contentMargin = 240;
  matchOptions: IsActiveMatchOptions = {
    paths: 'exact',
    matrixParams: 'exact',
    queryParams: 'subset',
    fragment: 'ignored'
  };
  menuItems = [
    {
      path: '/dashboard',
      icon: 'dashboard',
      label: 'Shrink Visibility'
    },
    {
      path: '/rfid-exit-read',
      icon: 'dashboard',
      label: 'RFID Exit Read',
    },
    {
      path: '/epc-read-list',
      icon: 'print',
      label: 'EPC Read List',
    },
    {
      path: '/management-performance',
      icon: 'store',
      label: 'Management Performance',
    },
  ];

constructor(private router:Router){}

  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    this.arrowIcon = this.isMenuOpen === false ?'keyboard_double_arrow_right':'keyboard_double_arrow_left'
    if(!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }

  isActiveRoute(routeUrl: string): boolean {
    return this.router.isActive(routeUrl, this.matchOptions);
  }
}
