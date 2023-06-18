import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-routine-selector',
  templateUrl: './routine-selector.page.html',
  styleUrls: ['./routine-selector.page.scss'],
})
export class RoutineSelectorPage implements OnInit {
  activity = [
    {
      name: 'Ejercitarse',
      icon: '',
      phrase: '¡Preparate para calentar, es hora!'
    },
    {
      name: 'Salir a la playa',
      icon: '',
      phrase: '¡Recuerda usar bloqueador!'
    },
    {
      name: 'Ir al parque',
      icon: '',
      phrase: '¡Recuerda que el clima será " " !'
    },
    {
      name: 'Ir al colegio',
      icon: '',
      phrase: 'Run Forrest, Run!'
    },
    {
      name: 'Cycling',
      icon: '',
      phrase: 'I want to ride my bicycle!'
    },
    {
      name: 'Swimming',
      icon: '',
      phrase: 'Just keep swimming!'
    },
  ]
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

}
