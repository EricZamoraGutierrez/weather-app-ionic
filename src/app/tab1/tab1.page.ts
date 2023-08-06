import { AnimationBuilder } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { HttpService } from '../services/http.service';
import { ThemesService } from '../services/themes.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  constructor(private theme: ThemesService) { }

  show: string = "";

  themeName: any = "";



  async themename() {
    this.themeName = await this.theme.getTheme();
  }

  async checkImg() {
    switch (this.themeName) {
      case "zerotwo": {
        this.show = "center-image-zerotwo";
        break;
      }
      case "shinobu": {
        this.show = "center-image-kocho";
        break;
      }
      case "rem": {
        this.show = "center-image-rem";
        break;
      } 
      case "tatsumaki": {
        this.show = "center-image-tatsumaki";
        break;
      }
      case "rias": {
        this.show = "center-image-rias";
        break;
      }
      default: {
        this.show = "center-image-zerotwo";
        break;
      }
  }
  }

  readTask = setInterval(() => {
    this.themename();
    this.checkImg();
  }, 2000);
}
