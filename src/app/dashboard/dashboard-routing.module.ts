import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
 {
  path: '',
  component:DashboardComponent,
  children: [
  {
    path: '',
    loadChildren: () => import('../modules/shrink-visibilty/shrink-visibilty.module').then((m) => m.ShrinkVisibiltyModule),
  },
  {
    path:'rfid-exit-read',
    loadChildren: () => import('../modules/rfid-exit-road/rfid-exit-road.module').then((m) => m.RfidExitRoadModule),
  },
  {
    path:'epc-read-list',
    loadChildren: () => import('../modules/epc-read-list/epc-read-list.module').then((m) => m.EpcReadListModule),
  },
  {
    path:'management-performance',
    loadChildren: () => import('../modules/management-performance/management-performance.module').then((m) => m.ManagementPerformanceModule)

  }
],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
