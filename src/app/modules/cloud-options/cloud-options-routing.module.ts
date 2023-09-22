import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CloudOptionsComponent } from "./cloud-options.component";

const routes: Routes = [
  {
    path: "",
    component: CloudOptionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CloudOptionsRoutingModule {}
