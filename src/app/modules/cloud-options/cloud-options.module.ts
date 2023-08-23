import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudOptionsRoutingModule } from './cloud-options-routing.module';
import { TabBarComponent } from './tab-bar/tab-bar.component';


@NgModule({
  declarations: [
    TabBarComponent
  ],
  imports: [
    CommonModule,
    CloudOptionsRoutingModule
  ]
})
export class CloudOptionsModule { }
