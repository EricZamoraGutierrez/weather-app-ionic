import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { PopoverController } from '@ionic/angular'



@Component({
  selector: 'app-routine-selector',
  templateUrl: './routine-selector.page.html',
  styleUrls: ['./routine-selector.page.scss'],
})
export class RoutineSelectorPage implements OnInit {


  @Output() applysChanges = new EventEmitter<any>();
  
  backgroundColor: string="";
  image: string="";
  name: string="";
  //Objeto Actividades predetermindas
  activity = [
    {
      name: 'Exercise',
      Image: ('../../../assets/ZeroTwo/ZeroHorny.png'),
      backgroundColor: '#F1FF9C',
      phrase: '¡Preparate para calentar, es hora!'
    },
    {
      name: 'Beach',
      Image: ('../../../assets/ZeroTwo/ZeroHorny.png'),
      backgroundColor: '#FFCA99',
      phrase: '¡Recuerda usar bloqueador!'
    },
    {
      name: 'Park',
      Image: ('../../../assets/ZeroTwo/ZeroHorny.png'),
      backgroundColor: '#8EF47E',
      phrase: '¡Recuerda que el clima será " " !'
    },
    {
      name: 'School',
      Image: ('../../../assets/ZeroTwo/ZeroHorny.png'),
      backgroundColor: '#FDCAE1',
      phrase: 'Run Forrest, Run!'
    },
    {
      name: 'Cycling',
      Image: ('../../../assets/ZeroTwo/ZeroHorny.png'),
      backgroundColor: '#FF6961',
      phrase: 'I want to ride my bicycle!'
    },
    {
      name: 'Swimming',
      Image: ('../../../assets/ZeroTwo/ZeroHorny.png'),
      backgroundColor: '#84B6F4',
      phrase: 'Just keep swimming!'
      
    },
  ]
  selectedActivity: any; // Variable para realizar un seguimiento de la actividad seleccionada
  selectedWeekDays: string [] = []; //Variable para la seleccionar los dias de la semana
  weekDays = ['L', 'M', 'Mi', 'J', 'V', 'S', 'D']; //Arreglo de los dias de la semana 
  selectedTime: string=""; //Variable para selecionar la hora

  constructor(private modalCtrl: ModalController, private popOveCtlr: PopoverController) { }


  //Metdod para selecionar una actividad
selectActivity(activity: any) {
    this.selectedActivity = activity;
  }

  //Metodo para cpmprobar si se a selecionado un dia de la semana
  isDaySelected(day: string) {
    return this.selectedWeekDays.includes(day);
  }

  //Cmabiar el estado de seleccion de un dia de la semana 
  toggleDaySelection(day: string) {
    if (this.isDaySelected(day)) {
      this.selectedWeekDays = this.selectedWeekDays.filter(d => d !== day);
    } else {
      this.selectedWeekDays.push(day);
    }
  }

  //Boton para guardar datos de lo selecionado
  applyChanges() {
    const routineData = {
      activity: this.selectedActivity,
      days: this.selectedWeekDays,
      time: this.selectedTime
    };
  
    this.popOveCtlr.dismiss(routineData);
  }

  

  

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

}
