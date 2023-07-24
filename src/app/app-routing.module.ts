import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { CarsListComponent } from './home/cars-list/cars-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/azure',
    pathMatch: 'full',
  },
  {
    path: 'azure',
    component: HomeComponent
  },
  {
    path: 'azure/car-list',
    component: CarsListComponent
  },
  {
    path: '',
    loadChildren: () =>
    import('./home/home.module').then(
      (m) => m.HomeModule
    )
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
