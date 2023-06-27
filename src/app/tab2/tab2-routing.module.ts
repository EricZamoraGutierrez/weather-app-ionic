import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { ModalController } from '@ionic/angular';
import { RoutineSelectorPage } from './routine-selector/routine-selector.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'routine-selector',
    loadChildren: () => import('./routine-selector/routine-selector.module').then(m => m.RoutineSelectorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {


}
