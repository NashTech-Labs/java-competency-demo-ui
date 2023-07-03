import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShrinkVisibiltyComponent } from './shrink-visibilty.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: ShrinkVisibiltyComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShrinkVisibiltyRoutingModule { }
