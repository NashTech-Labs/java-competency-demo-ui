import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {Observable, of} from 'rxjs';
import {REST_ENDPOINT} from 'src/app/app.constants';
import {environment} from 'src/environments/environment';
import {retry} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  SSOUrl = environment.ssoApiUrl;

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router) {
  }

  /**
   * return token stored in cookie
   */
  getTokenFromCookie(): string | null{
    const token = this.cookieService.get('token');
    if (token && token.trim() !== '') {
      return token;
    }
    return null;
  }

  /**
   * return token stored in cookie
   */
  removeTokenFromCookie(): void {
    this.cookieService.remove('token');
  }

  saveTokenInCookie(token: string): string | null {
    if (token && token.trim() !== '') {
      this.cookieService.put('token', token);
      return token;
    }
    return null;
  }

  /**
   * return tenant id from local cookie
   */
  getTenantIdFromCookie(): string | null{
    const tenantId = this.cookieService.get('tenantId');
    if (tenantId && tenantId.trim() !== '') {
      return tenantId;
    }
    return null;
  }

  /**
   * remove tenant id from local cookie
   */
  removeTenantIdFromCookie(): void {
    this.cookieService.remove('tenantId');
  }

  saveInCookie(key: string, value: string | any) {
    if (!key && !value) {
      return;
    }
    this.cookieService.put(key, value);
  }

  getFromCookie(key: string) {
    if (!key) {
      return;
    }
    return this.cookieService.get(key);
  }

  removeFromCookie(key: string) {
    if (!key) {
      return;
    }
    this.cookieService.remove(key);
  }

  saveTenantIdInCookie(tenantId: string): string | null{
    if (tenantId && tenantId.trim() !== '') {
      this.cookieService.put('tenantId', tenantId);
      return tenantId;
    }
    return null;
  }

  saveTenantInCookies() {
    this.httpClient.get('https://my.api.mockaroo.com/tenant_response.json?key=0cd4eec0')
      .subscribe((res: any) => {
        this.cookieService.put('id', res.id);
        this.cookieService.put('name', res.name);
      }, (err) => {
        // if error is happened
        this.router.navigateByUrl("/");
      });
  }

  /**
   *
   * @param token
   * funtion verfies the token at server
   * @param tenantId
   */
  verifyToken(token: string, tenantId: string): Observable<any> {
    if (!token || token.trim() === '') {
      return of(null);
    }
    const url = `${this.SSOUrl}${REST_ENDPOINT.auth.verifyToken}`;

    // Request payload
    const payload = {
      token: token,
      tenantId: tenantId
    };

    return this.httpClient.post(url, payload).pipe(
      retry(1) // retry a failed request
    );
  }

  fetchTokenFromSSOServer(UUID: string): Observable<any> {
    if (!UUID || UUID.trim() === '') {
      return of(null);
    }
    const url = `${this.SSOUrl}${REST_ENDPOINT.auth.fetchToken}/${UUID}`;
    return this.httpClient.get(url);
  }

  /**
   * fetch the token from sso server
   */
  loginSSO(): void {
    const currentUrl = location.href;
    let origin = `${location.origin}/#/`;

    const encodedComponent = encodeURIComponent(origin);
    window.location.href = `${this.SSOUrl}${REST_ENDPOINT.auth.validate}?userid=${null}
    &redirecturl=${encodedComponent}&appId=shrinkanalyzer`;
  }

  getAuthHttpOptions(): { headers: HttpHeaders } {
    const authToken = this.getTokenFromCookie();
    const tenantId = this.getTenantIdFromCookie()?? '';;
    const bearerToken = `Bearer ${authToken}`;
    const headers = new HttpHeaders()
      .set('Authorization', bearerToken)
      .set('tenant', tenantId);
    return {
      headers
    };
  }

  fetchUserInformation(): Observable<any> {
    const url = `${this.SSOUrl}${REST_ENDPOINT.user.fetch}`;
    const token = this.getTokenFromCookie();
    if (!token) {
      return of(null);
    }
    const payload = {
      token: token
    };
    return this.httpClient.post(url, payload);
  }

  /**
   * remove all cookies from
   */
  clearAllCookies() {
    this.cookieService.removeAll();
  }

  logout() {

    // fetch user id from cookie before deleting it.
    this.getFromCookie('uid');

    // remove all cokies from local browser
    this.clearAllCookies();

    const currentUrl = location.href;
    let origin = `${location.origin}/#/`;

    // call api to remove cookie from server
    const encodedComponent = encodeURIComponent(origin);
    // redirect logout to sso server
    window.location.href = `${this.SSOUrl}${REST_ENDPOINT.auth.deleteTokn}?userid=${null}
    &redirecturl=${encodedComponent}`;
  }
}
