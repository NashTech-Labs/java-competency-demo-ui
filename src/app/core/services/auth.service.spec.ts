import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie';
import {Router} from '@angular/router';
import {Observable, of, throwError} from "rxjs";
import {fakeAsync, tick} from "@angular/core/testing";
import {REST_ENDPOINT} from "../../app.constants";

describe('AuthService', () => {
  let authService: AuthService;
  let httpClient: HttpClient;
  let cookieService: CookieService;
  let router: Router;
  let windowSpy: jasmine.Spy;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    cookieService = jasmine.createSpyObj('CookieService', ['get', 'put', 'remove', 'removeAll']);
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);

    authService = new AuthService(httpClient, cookieService, router);
    authService.SSOUrl = 'https://www.testmocksso.com';
  });

  it('should create AuthService', () => {
    expect(authService).toBeTruthy();
  });

  it('should get token from cookie', () => {
    (cookieService.get as jasmine.Spy).and.returnValue('token123');
    const result = authService.getTokenFromCookie();
    expect(result).toBe('token123');
    expect(cookieService.get).toHaveBeenCalledWith('token');
  });

  it('should return null if token is not found in cookie', () => {
    (cookieService.get as jasmine.Spy).and.returnValue('');
    const result = authService.getTokenFromCookie();
    expect(result).toBeNull();
    expect(cookieService.get).toHaveBeenCalledWith('token');
  });

  it('should remove token from cookie', () => {
    authService.removeTokenFromCookie();
    expect(cookieService.remove).toHaveBeenCalledWith('token');
  });

  it('should save token in cookie', () => {
    const token = 'token123';
    authService.saveTokenInCookie(token);
    expect(cookieService.put).toHaveBeenCalledWith('token', token);
    expect(cookieService.put).toHaveBeenCalledTimes(1);
  });


  it('should return null if token is empty when saving in cookie', () => {
    const token = '';
    const result = authService.saveTokenInCookie(token);
    expect(result).toBeNull();
    expect(cookieService.put).toHaveBeenCalledTimes(0);
  });

  it('should get tenant ID from cookie', () => {
    (cookieService.get as jasmine.Spy).and.returnValue('tenantId123');
    const result = authService.getTenantIdFromCookie();
    expect(result).toBe('tenantId123');
    expect(cookieService.get).toHaveBeenCalledWith('tenantId');
  });

  it('should return null if tenant ID is not found in cookie', () => {
    (cookieService.get as jasmine.Spy).and.returnValue('');
    const result = authService.getTenantIdFromCookie();
    expect(result).toBeNull();
    expect(cookieService.get).toHaveBeenCalledWith('tenantId');
  });

  it('should remove tenant ID from cookie', () => {
    authService.removeTenantIdFromCookie();
    expect(cookieService.remove).toHaveBeenCalledWith('tenantId');
  });

  it('should save value in cookie', () => {
    authService.saveInCookie('key', 'value');
    expect(cookieService.put).toHaveBeenCalledWith('key', 'value');
  });

  it('should not save a value in the cookie if the key or value is empty', () => {
    authService.saveInCookie('', '');
    expect(cookieService.get('')).toBeUndefined();
  });

  it('should get value from cookie when key is provided', () => {
    (cookieService.get as jasmine.Spy).and.returnValue('value123');
    const result = authService.getFromCookie('key');
    expect(result).toBe('value123');
    expect(cookieService.get).toHaveBeenCalledWith('key');
  });

  it('should return undefined when key is not provided in getFromCookie', () => {
    const result = authService.getFromCookie('');
    expect(result).toBeUndefined();
    expect(cookieService.get).not.toHaveBeenCalled();
  });

  it('should remove value from cookie when key is provided', () => {
    authService.removeFromCookie('key');
    expect(cookieService.remove).toHaveBeenCalledWith('key');
  });

  it('should not remove value from cookie when key is not provided in removeFromCookie', () => {
    authService.removeFromCookie('');
    expect(cookieService.remove).not.toHaveBeenCalled();
  });

  it('should save tenant in cookies successfully', fakeAsync(() => {
    const mockResponse = {id: '123', name: 'Test Tenant'};
    (httpClient.get as jasmine.Spy).and.returnValue(of(mockResponse));

    authService.saveTenantInCookies();

    expect(httpClient.get).toHaveBeenCalledWith('https://my.api.mockaroo.com/tenant_response.json?key=0cd4eec0');
    expect(cookieService.put).toHaveBeenCalledWith('id', '123');
    expect(cookieService.put).toHaveBeenCalledWith('name', 'Test Tenant');
    expect(router.navigateByUrl).not.toHaveBeenCalled();

    tick();

    expect(cookieService.put).toHaveBeenCalledTimes(2);
  }));

  it('should navigate to home page when saveTenantInCookies encounters an error', (done) => {
    (httpClient.get as jasmine.Spy).and.returnValue(throwError('Error'));
    authService.saveTenantInCookies();

    expect(httpClient.get).toHaveBeenCalledWith('https://my.api.mockaroo.com/tenant_response.json?key=0cd4eec0');
    expect(cookieService.put).not.toHaveBeenCalled();

    setTimeout(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
      done();
    }, 0);
  });

  it('should return null if tenant ID is empty when saving in cookie', () => {
    const tenantId = '';
    const result = authService.saveTenantIdInCookie(tenantId);
    expect(result).toBeNull();
    expect(cookieService.put).toHaveBeenCalledTimes(0);
  });

  it('should get Authorization headers', () => {
    const mockToken = 'token123';
    const mockTenantId = 'tenantId123';
    (cookieService.get as jasmine.Spy).and.returnValue(mockToken);
    (cookieService.get as jasmine.Spy).withArgs('tenantId').and.returnValue(mockTenantId);
    const expectedHeaders = new HttpHeaders()
        .set('Authorization', `Bearer ${mockToken}`)
        .set('tenant', mockTenantId);
    const result = authService.getAuthHttpOptions();
    expect(result.headers).toEqual(expectedHeaders);
  });

  it('should fetch user information', () => {
    const mockToken = 'token123';
    const mockResponse = {name: 'John Doe'};
    (cookieService.get as jasmine.Spy).and.returnValue(mockToken);
    (httpClient.post as jasmine.Spy).and.returnValue(of(mockResponse));
    authService.fetchUserInformation().subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(httpClient.post).toHaveBeenCalledWith(`${authService.SSOUrl}/v1/api/user/info`, {token: mockToken});
    });
  });

  it('should return null when token is not provided in fetchUserInformation', () => {
    spyOn(authService, 'getTokenFromCookie').and.returnValue(null);

    authService.fetchUserInformation().subscribe((response) => {
      expect(response).toBeNull();
      expect(authService.getTokenFromCookie).toHaveBeenCalled();
      expect(httpClient.post).not.toHaveBeenCalled();
    });
  });

  it('should clear all cookies', () => {
    authService.clearAllCookies();
    expect(cookieService.removeAll).toHaveBeenCalled();
  });

  it('should return null when token is not provided in verifyToken', () => {
    const result = authService.verifyToken('', 'tenantId').toPromise();
    result.then((response) => {
      expect(response).toBeNull();
      expect(httpClient.post).not.toHaveBeenCalled();
    });
  });


  it('should call httpClient.post with the correct URL and payload in verifyToken', () => {
    const token = 'token123';
    const tenantId = 'tenantId123';
    const expectedUrl = `${authService.SSOUrl}${REST_ENDPOINT.auth.verifyToken}`;
    const expectedPayload = {token: token, tenantId: tenantId};

    (httpClient.post as jasmine.Spy).and.returnValue(of({}));

    const result = authService.verifyToken(token, tenantId).toPromise();

    result.then(() => {
      expect(httpClient.post).toHaveBeenCalledWith(expectedUrl, expectedPayload);
    });
  });

  it('should fetch token from SSO server', () => {
    const UUID = 'validUUID';
    const url = `${authService.SSOUrl}${REST_ENDPOINT.auth.fetchToken}/${UUID}`;
    const response = {token: 'abc123'};

    (httpClient.get as jasmine.Spy).and.returnValue(of(response));

    authService.fetchTokenFromSSOServer(UUID).subscribe((result) => {
      expect(result).toEqual(response);
      expect(httpClient.get).toHaveBeenCalledWith(url);
    });
  });

  it('should return null when UUID is not provided in fetchTokenFromSSOServer', () => {
    const result = authService.fetchTokenFromSSOServer('');
    expect(result).toBeInstanceOf(Observable);
    expect(httpClient.get).not.toHaveBeenCalled();
  });
});
