import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { RoutineSelectorPage } from './routine-selector/routine-selector.page';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

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

  selectedCardId: number | null = null; // Variable para almacenar el ID de la tarjeta seleccionada

  constructor(private popOverctrl: PopoverController,private alertController: AlertController,private storage: Storage) {
    // Crear la instancia de Storage y cargar las tarjetas almacenadas
    this.storage.create().then(() => {
      this.loadCards();
    });
  }

  // Cargar las tarjetas desde el almacenamiento
  async loadCards() {
    const storedCards = await this.storage.get('cards');
    if (storedCards) {
      this.cards = JSON.parse(storedCards);
      this.nextCardId = this.cards.length + 1;
    }
  }

  // Guardar las tarjetas en el almacenamiento
  async saveCards() {
    await this.storage.set('cards', JSON.stringify(this.cards));
  }

  // Agregar una nueva tarjeta
  addCard() {
    const newCard = { id: this.nextCardId };
    this.cards.push(newCard);
    this.nextCardId++;

    this.saveCards();
  }

  // Eliminar una tarjeta
  removeCard(cardId: number) {
    const index = this.cards.findIndex((objeto) => objeto.id === cardId);
    if (index !== -1) {
      this.cards.splice(index, 1);
      this.saveCards();
    }
  }

  // Actualizar una tarjeta
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
      this.saveCards();
    }

    this.openPopover();
  }

  // Abrir el popover para seleccionar una rutina
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
            this.saveCards();
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
          this.saveCards();
        }
      }

      this.selectedCardId = null;
    });

    await popover.present();
  }

  // Mostrar el mensaje de confirmación para eliminar una tarjeta
  async presentAlert(cardId: number) {
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
