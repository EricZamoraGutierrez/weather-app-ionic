import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { RoutineSelectorPage } from './routine-selector/routine-selector.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  cards: any[] = [];
  nextCardId = 1;
  selectedRoutine: any = null;

  alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Yes',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.removeCard(this.selectedCardId);
      },
    },
  ];

  selectedCardId: number=0; // Variable para almacenar el ID de la tarjeta seleccionada

  constructor(
    private popOverctrl: PopoverController,
    private alertController: AlertController
  ) {}

  addCard() {
    this.cards.push({ id: this.nextCardId });
    this.nextCardId++;
  }

  removeCard(cardId: number) {
    this.cards = this.cards.filter((card) => card.id !== cardId);
  }

  updateRoutine(card: any) {
    this.selectedCardId = card.id;
    const index = this.cards.findIndex((card) => card.id === this.selectedCardId);
    if (index !== -1) {
      // Aquí debes proporcionar los nuevos datos de la rutina actualizada
      const updatedCard = {
        id: card.id,
        activity: card.activity,
        days: card.days,
        time: card.time,
      };
      this.cards[index] = updatedCard;
    }
  
    // Abrir el popover con los datos de la rutina seleccionada
    this.openPopover(card);
  }

    // Abrir el popover con los datos de la rutina seleccionada
   

  async openPopover(e: Event) {
    const popover = await this.popOverctrl.create({
      component: RoutineSelectorPage,
      cssClass: 'custom-popover',
    });

    popover.onDidDismiss().then((data) => {
      if (data && data.data) {
        const newCard = {
          id: this.nextCardId,
          activity: data.data.activity,
          days: data.data.days,
          time: data.data.time,
        };
        

        this.cards.push(newCard);
        this.nextCardId++;
      }
    });
    

    await popover.present();
  }

  async presentAlert(cardId: number) {
    this.selectedCardId = cardId; // Almacenar el ID de la tarjeta seleccionada
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      buttons: this.alertButtons,
    });

    await alert.present();
  }
}
