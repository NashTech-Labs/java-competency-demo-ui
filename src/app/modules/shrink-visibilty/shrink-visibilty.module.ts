import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShrinkVisibiltyRoutingModule } from './shrink-visibilty-routing.module';
import { ShrinkVisibiltyComponent } from './shrink-visibilty.component';


@NgModule({
  declarations: [
    ShrinkVisibiltyComponent
  ],
  imports: [
    CommonModule,
    ShrinkVisibiltyRoutingModule
  ]
})
export class ShrinkVisibiltyModule { }
