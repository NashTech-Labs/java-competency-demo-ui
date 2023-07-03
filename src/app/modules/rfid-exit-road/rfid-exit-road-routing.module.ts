import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RFIDExitRoadComponent } from './rfid-exit-road.component';

const routes: Routes = [
  {
    path:'',
    component:RFIDExitRoadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RfidExitRoadRoutingModule { }
