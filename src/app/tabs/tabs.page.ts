import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { Tab1Page } from '../tab1/tab1.page';
import { Tab2Page } from '../tab2/tab2.page';
import { Tab3Page } from '../tab3/tab3.page';
import { Tab1PageModule } from '../tab1/tab1.module';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  tab1Root = Tab1Page;
  tab2Root = Tab2Page;
  tab3Root = Tab3Page;

  constructor() {}
  
}

