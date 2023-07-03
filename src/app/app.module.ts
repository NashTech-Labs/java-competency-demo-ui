import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatePipe} from '@angular/common';
import {CookieModule} from 'ngx-cookie';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {AgGridModule} from "ag-grid-angular";
import { AuthProcessComponent } from './core/components/auth/auth-process/auth-process.component';
import { AuthVerifyComponent } from './core/components/auth/auth-verify/auth-verify.component';
import { httpInterceptorProviders } from './core/http-interceptors';
import { MaterialModule } from './shared/module/material.module';


@NgModule({
  declarations: [
    AppComponent,
    AuthVerifyComponent,
    AuthProcessComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    AgGridModule,
    MaterialModule
    ],
  providers: [DatePipe, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
