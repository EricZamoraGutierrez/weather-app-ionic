import { Component, OnInit } from '@angular/core';
import { ThemesService } from '../services/themes.service';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})

export class Tab3Page implements OnInit{

  ngOnInit() {
    this.getTheme();  
  }

  toggler: string = 'Add';



  constructor() { }

  ThemeSelector(theme: any) {
    let body = document.getElementsByTagName('html')[0];
    body.classList.remove('md-ZeroTwo');
    body.classList.remove('md-Shinobu');
    body.classList.remove('md-rem');
    body.classList.remove('md-tatsumaki');
    body.classList.remove('md-marin');

    if (theme == 'zerotwo' || theme == 'shinobu' || theme == 'rem' || theme == 'tatsumaki' || theme == 'marin') {
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
        case 'marin':
          body.classList.remove();
          body.classList.add('md-marin');
          this.setTheme('marin');
          break;
      }
    } else {
      body.classList.remove('md-ZeroTwo');
      body.classList.remove('md-Shinobu');
      body.classList.remove('md-rem');
      body.classList.remove('md-tatsumaki');
      body.classList.remove('md-marin');
      body.classList.add('md');
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
