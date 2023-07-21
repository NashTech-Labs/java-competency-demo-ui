import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home.component";

const routes: Routes = [ {
  path: '',
  component:HomeComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('./car-brands/car-brands.component').then((m) => m.CarBrandsComponent),
    },
  //   {
  //     path:'rfid-exit-read',
  //     loadChildren: () => import('../modules/rfid-exit-road/rfid-exit-road.module').then((m) => m.RfidExitRoadModule),
  //   },
  //   {
  //     path:'epc-read-list',
  //     loadChildren: () => import('../modules/epc-read-list/epc-read-list.module').then((m) => m.EpcReadListModule),
  //   },
  //   {
  //     path:'management-performance',
  //     loadChildren: () => import('../modules/management-performance/management-performance.module').then((m) => m.ManagementPerformanceModule)
  //
  //   }
  ],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
