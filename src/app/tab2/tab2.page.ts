import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { RoutineSelectorPage } from './routine-selector/routine-selector.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  cards: any[] = [];// Arreglo para almacenar las tarjetas de la rutina
  nextCardId = 1;// Variable para asignar el siguiente ID de tarjeta
  selectedRoutine: any = null;// Variable para almacenar la rutina seleccionada

  // Metodo para agregar una rutina
  addCard() {
    this.cards.push({ id: this.nextCardId });
    this.nextCardId++;
  }

  // Metodo para eliminar una rutina
  removeCard(cardId: number) {
    this.cards = this.cards.filter(card => card.id !== cardId);
  }

  constructor(private popOverctrl: PopoverController) { }

  // Metodo para abrir la ventana emergente de la rutina 
  async openPopover(e: Event) {
    const popover = await this.popOverctrl.create({
      component: RoutineSelectorPage,
      cssClass: 'custom-popover',
    });

    // Se ejecuta cuando se cierra la ventana emergente
    popover.onDidDismiss().then(data => {
      if (data && data.data) {
        // Se crea una nueva rutina
        const newCard = {
          id: this.nextCardId,
          activity: data.data.activity,
          days: data.data.days,
          time: data.data.time
        };

        // Se agrega la nueva rutina
        this.cards.push(newCard);
        this.nextCardId++;
      }
    });

    await popover.present();
  }
}