import { Component } from "@angular/core";
import { constants } from "../constants/constants";
import {ThemePalette} from "@angular/material/core";


/**
 * Represents the HomeComponent, the landing page of the application.
 */
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})


export class HomeComponent {
  Title: string = "Java UI Demo";
  Description: string = "A Reactive Application";
  color: ThemePalette



  /**
   * The URL for the NashTech logo, obtained from the constants file.
   */
  nashTechLogoUrl: string = constants.nashTechLogoUrl;

  /**
   * An array of cloud options with their labels and paths.
   */
  cloudOptions = [
    { label: "Azure", path: "./azure", icon: constants.azureIcon, color: 'accent', isSelected:true },
    { label: "GCP", path: "./gcp", icon: constants.gcpIcon, color: 'accent', isSelected:false  },
  ];



}
