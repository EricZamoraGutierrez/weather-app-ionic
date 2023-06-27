import { Component } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { RoutineSelectorPage } from './routine-selector/routine-selector.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

cards: any[] = [];
nextCardId= 1;

addCard(){
  this.cards.push({ id: this.nextCardId });
    this.nextCardId++;
  
}

removeCard(cardId: number) {
  this.cards = this.cards.filter(card => card.id !== cardId);
}


constructor(private popOverctrl: PopoverController, private modalCtrl: ModalController) { }

async openPopover() {
  const popover = await this.popOverctrl.create({
    component: RoutineSelectorPage,
    cssClass: 'custom-popover'
    });
    popover.onDidDismiss().then((data) => {
      if (data && data.data) {
        const { name, backgroundColor } = data.data.activity;
        const newCard = {
          id: this.nextCardId,
          name: name,
          backgroundColor: backgroundColor
        };
        this.cards.push(newCard);
        this.nextCardId++;
      }
    });
    await popover.present();
}





}
