import { Injectable,Inject } from '@angular/core';
import * as Color from 'color';
import { DOCUMENT } from '@angular/common';
import { Storage } from '@ionic/storage';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ThemeSelector(theme: any) {
    let body = document.getElementsByTagName('html')[0];
    let centerImage = document.getElementById('center-image');
    // centerImage.classList.remove('');
    // centerImage.classList.remove('md-shinobu');
    // centerImage.classList.remove('md-rem');
    // centerImage.classList.remove('md-tatsumaki');
    // centerImage.classList.remove('md-rias');
    body.classList.remove('md-ZeroTwo');
    body.classList.remove('md-Shinobu');
    body.classList.remove('md-rem');
    body.classList.remove('md-tatsumaki');
    body.classList.remove('md-rias');

    if (theme == 'zerotwo' || theme == 'shinobu' || theme == 'rem' || theme == 'tatsumaki' || theme == 'rias') {
      switch (theme) {
        case 'zerotwo':
          body.classList.remove();
          body.classList.add('md-ZeroTwo');
          this.setTheme('zerotwo');
          break;
        case 'shinobu':
          body.classList.remove();
          body.classList.add('md-Shinobu');
          this.setTheme('shinobu');
          break;
        case 'rem':
          body.classList.remove();
          body.classList.add('md-rem');
          this.setTheme('rem');
          break;
        case 'tatsumaki':
          body.classList.remove();
          body.classList.add('md-tatsumaki');
          this.setTheme('tatsumaki');
          break;
        case 'rias':
          body.classList.remove();
          body.classList.add('md-rias');
          this.setTheme('rias');
          break;
      }
    } else {
      body.classList.remove('md-ZeroTwo');
      body.classList.remove('md-Shinobu');
      body.classList.remove('md-rem');
      body.classList.remove('md-tatsumaki');
      body.classList.remove('md-rias');
      body.classList.add('md');
      this.setTheme('md');
    }
  }

  async setTheme(theme: any) {
    await Preferences.set({ key: 'theme', value: theme });
    console.log('Theme set to: ' + theme);
  }

  async getTheme() {
    const { value } = await Preferences.get({ key: 'theme' });
    this.ThemeSelector(value);
  }
}