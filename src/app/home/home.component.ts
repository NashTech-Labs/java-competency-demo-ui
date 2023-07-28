import { Component } from "@angular/core";
import { constants } from "../constants/constants";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  nashTechLogoUrl: string = constants.nashTechLogoUrl;

  cloudOptions = [
    { label: "AZURE", path: "azure" },
    { label: "GCP", path: "gcp" },
  ];
}
