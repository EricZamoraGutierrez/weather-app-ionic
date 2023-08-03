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
export class Tab1Page  {
  

  constructor(private theme: ThemesService) { }

  show: boolean = false;

  themeName: any = "";



  async themename(){
   this.themeName = await this.theme.getTheme();
  }

  async checkImg(){
    if( this.themeName == "zerotwo" ){
      this.show = false; 
    }else{
      this.show = true;
    } 
  }

  readTask =  setInterval(() => {
    this.themename();
    this.checkImg();
  }, 2000);
}
