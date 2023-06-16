import { Component } from '@angular/core';
import { ThemesService } from '../services/themes.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  toggler: string = 'Add';


  constructor() { }

  ThemeSelector(theme: any) {
    let body = document.getElementsByTagName('html')[0];
    body.classList.remove('md-ZeroTwo');
    body.classList.remove('md-Shinobu');

    if (theme == 'zerotwo' || theme == 'shinobu') {
      switch (theme) {
        case 'zerotwo':
          body.classList.remove();
          body.classList.add('md-ZeroTwo');
          break;
        case 'shinobu':
          body.classList.remove();
          body.classList.add('md-Shinobu');
          break;
          case 'rem':
          body.classList.remove();
          body.classList.add('md-rem');
          break;
      }
    } else {
      body.classList.remove('md-ZeroTwo');
      body.classList.remove('md-Shinobu');
      body.classList.remove('md-rem');
      body.classList.add('md');
    }
  }
}
