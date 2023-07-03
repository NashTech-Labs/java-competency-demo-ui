import {Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userInfo: UserInfo = {
    email: '',
    customAttributes: [],
    lastLoginAt: '',
    displayName: ''
  };

  constructor(private authService: AuthService) {
  }
  
  ngOnInit(): void {

    this.authService.fetchUserInformation()?.subscribe(
      (res) => {
        if (res) {
          this.authService.saveInCookie('uinfo', JSON.stringify(res));
          this.userInfo = JSON.parse(this.authService.getFromCookie('uinfo') ?? '');
        }
      },
      (err) => {
        console.log(err);
      }
    );
    }
  getShortName(fullName : string) {
    const names = fullName.split(' ');
    let initials = names[0][0];
    if (names.length > 1 && names[names.length - 1] !== '') {
      initials += names[names.length - 1][0];
    }
    return initials;
  }

  logout() {
    this.authService.logout();
  }
}
export interface UserInfo{
    email: string,
    customAttributes:string [],
    lastLoginAt: string,
    displayName: string
}