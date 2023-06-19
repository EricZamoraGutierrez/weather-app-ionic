import { Component, OnInit } from '@angular/core';
import { GestureController } from '@ionic/angular';
GestureController

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private gestureCtrl: GestureController) {}
  ngOnInit() {
    this.enableTabSwipeGesture();
  }
  
  enableTabSwipeGesture() {
    const tabBar = document.querySelector('ion-tab-bar');
    if (tabBar) {
      const gesture = this.gestureCtrl.create({
        el: tabBar,
        gestureName: 'swipe',
        direction: 'x',
        threshold: 20,
        canStart: () => true,
        onMove: ev => {
          if (ev.deltaX > 0) {
            // Arrastrar hacia la derecha
            // Cambiar a la pestaña anterior
          } else if (ev.deltaX < 0) {
            // Arrastrar hacia la izquierda
            // Cambiar a la siguiente pestaña
          }
        }
      });
      gesture.enable();
    }
  }
}
