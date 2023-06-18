import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutineSelectorPageRoutingModule } from './routine-selector-routing.module';

import { RoutineSelectorPage } from './routine-selector.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutineSelectorPageRoutingModule
  ],
  declarations: [RoutineSelectorPage]
})
export class RoutineSelectorPageModule {}
