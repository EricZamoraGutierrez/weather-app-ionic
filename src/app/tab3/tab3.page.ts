import { Component, OnInit } from '@angular/core';
import { ThemesService } from '../services/themes.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})

export class Tab3Page{

  

  toggler: string = 'Add';


  constructor(private themeSelector: ThemesService) { }

  ThemeSelector(Theme: any) {
    this.themeSelector.ThemeSelector(Theme);
  }
}
