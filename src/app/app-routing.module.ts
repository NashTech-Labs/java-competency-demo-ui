import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CarBrandsComponent} from "./home/car-brands/car-brands.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/azure',
    pathMatch: 'full',
  },
  {
    path: 'azure',
    component: CarBrandsComponent
  },
  {
    path: 'gcp',
    component: CarBrandsComponent
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
