import { Component } from '@angular/core';
import { ThemesService } from '../services/themes.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  toggler: string = 'Add';

  constructor() {}

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
          break;
        case 'shinobu':
          body.classList.remove();
          body.classList.add('md-Shinobu');
          break;
        case 'rem':
          body.classList.remove();
          body.classList.add('md-rem');
          break;
          case 'tatsumaki':
            body.classList.remove();
            body.classList.add('md-tatsumaki');
            break;  
            case 'marin':
            body.classList.remove();
            body.classList.add('md-marin');
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
}
