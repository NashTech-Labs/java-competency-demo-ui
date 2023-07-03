import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise((resolve, reject) => {
      // get token from cookie.
      const token = this.authService.getTokenFromCookie();
      const tenantId = this.authService.getTenantIdFromCookie();

      if (token && tenantId) {
        this.authService.verifyToken(token, tenantId).subscribe(
          (res) => {
            if (res.uid) {
              this.authService.saveInCookie('uid', res.uid);
            }
            resolve(true);
          },
          (err: HttpErrorResponse) => {
            // if token is invalid then remove it from
            // cookie and navigate user to login
            this.authService.removeTokenFromCookie();
            this.authService.removeTenantIdFromCookie();
            this.router.navigateByUrl('/');
            resolve(false);
          }
        );
      } else {
        this.router.navigateByUrl('/');
        resolve(false);
      }
    });
  }
}
