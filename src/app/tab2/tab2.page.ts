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
        if (this.selectedCardId !== null) {
          this.removeCard(this.selectedCardId);
        }
      },
    },
  ];

  selectedCardId: number | null = null;// Variable para almacenar el ID de la tarjeta seleccionada

  constructor(private popOverctrl: PopoverController,private alertController: AlertController) {}

  //Agrgar una nueva rutina
  addCard() {
    const newCard = { id: this.nextCardId };
    this.cards.push(newCard);
    this.nextCardId++;
  }

  //Eliminar rutina
  removeCard(cardId: number) {
    this.cards = this.cards.filter((card) => card.id !== cardId);
  }
  

  //Actualizar rutina
  updateRoutine(card: any) {
    this.selectedCardId = card.id;
    const index = this.cards.findIndex((card) => card.id === this.selectedCardId);
    if (index !== -1) {
      const updatedCard = {
        id: card.id,
        activity: card.activity,
        days: card.days,
        time: card.time,
      };
      this.cards[index] = updatedCard;
    }
  
    this.openPopover();
  }


  //Abrir el popover
  async openPopover() {
    const popover = await this.popOverctrl.create({
      component: RoutineSelectorPage,
      cssClass: 'custom-popover',
    });
  
    popover.onDidDismiss().then((data) => {
      if (data && data.data) {
        if (this.selectedCardId !== null) {
          // Actualizar tarjeta existente
          const index = this.cards.findIndex((card) => card.id === this.selectedCardId);
          if (index !== -1) {
            const updatedCard = {
              id: this.selectedCardId,
              activity: data.data.activity,
              days: data.data.days,
              time: data.data.time,
            };
            this.cards[index] = updatedCard;
          }
        } else {
          // Crear nueva tarjeta
          const newCard = {
            id: this.nextCardId,
            activity: data.data.activity,
            days: data.data.days,
            time: data.data.time,
          };
          this.cards.push(newCard);
          this.nextCardId++;
        }
      }
  
      this.selectedCardId = null; 
    });
  
    await popover.present();
  }

  //Boton eliminar rutina
  async presentAlert(cardId: number) {
    console.log(cardId); 
    if (cardId !== null) {
      const alert = await this.alertController.create({
        header: 'Are you sure?',
        buttons: [
          {
            text: 'No',
            cssClass: 'alert-button-cancel',
          },
          {
            text: 'Yes',
            cssClass: 'alert-button-confirm',
            handler: () => {
              this.removeCard(cardId); 
            },
          },
        ],
      });
  
      await alert.present();
    }
  }
  
  
  
  
}
