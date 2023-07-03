import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthProcessComponent } from './core/components/auth/auth-process/auth-process.component';
import { AuthVerifyComponent } from './core/components/auth/auth-verify/auth-verify.component';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth-verify',
    pathMatch: 'full',
  },
  {
    path: 'auth-verify',
    component: AuthVerifyComponent
  },
  {
    path: 'auth-process/:userid/:tenantId/:uuid',
    component: AuthProcessComponent
  },
  {
    path: '',
    loadChildren: () =>
    import('./dashboard/dashboard.module').then(
      (m) => m.DashboardModule
    ),  
    canActivate: [AuthGuard],
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
