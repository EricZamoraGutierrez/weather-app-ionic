import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import {LocalNotifications,ScheduleEvery,ScheduleOptions,} from '@capacitor/local-notifications';
import { HttpService } from '../../services/http.service';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';


@Component({
  selector: 'app-routine-selector',
  templateUrl: './routine-selector.page.html',
  styleUrls: ['./routine-selector.page.scss'],
})
export class RoutineSelectorPage implements OnInit {
  @Output() applysChanges = new EventEmitter<any>();

  backgroundColor: string = '';
  image: string = '';
  name: string = '';
  //Objeto Actividades predetermindas
  activity = [
    {
      name: 'Exercise',
      Image: '../../../assets/ZeroTwo/ZeroHorny.png',
      backgroundColor: '#F1FF9C',
      phrase: '¡Preparate para calentar, es hora!',
    },
    {
      name: 'Beach',
      Image: '../../../assets/ZeroTwo/ZeroHorny.png',
      backgroundColor: '#FFCA99',
      phrase: '¡Recuerda usar bloqueador!',
    },
    {
      name: 'Park',
      Image: '../../../assets/ZeroTwo/ZeroHorny.png',
      backgroundColor: '#8EF47E',
      phrase: '¡Recuerda que el clima será " " !',
    },
    {
      name: 'School',
      Image: '../../../assets/ZeroTwo/ZeroHorny.png',
      backgroundColor: '#FDCAE1',
      phrase: 'Run Forrest, Run!',
    },
    {
      name: 'Cycling',
      Image: '../../../assets/ZeroTwo/ZeroHorny.png',
      phrase: 'I want to ride my bicycle!',
    },
    {
      name: 'Swimming',
      Image: '../../../assets/ZeroTwo/ZeroHorny.png',
      backgroundColor: '#84B6F4',
      phrase: 'Just keep swimming!',
    },
  ];
  selectedActivity: any; // Variable para realizar un seguimiento de la actividad seleccionada
  selectedWeekDays: string[] = []; //Variable para la seleccionar los dias de la semana
  weekDays = ['D', 'L', 'M', 'Mi', 'J', 'V', 'S']; //Arreglo de los dias de la semana
  selectedTime: string = ''; //Variable para selecionar la hora
  InformationComplete: boolean = true; //Verificar si la informacion solicitada esta completa

  constructor(
    private modalCtrl: ModalController,
    private popOveCtlr: PopoverController,
    private http: HttpService
  ) {}

  //Metdod para selecionar una actividad
  selectActivity(activity: any) {
    this.selectedActivity = activity;
    this.InformationCompleteVerification(); // Llamar al método para verificar la información completa
  }

  //Metodo para cpmprobar si se a selecionado un dia de la semana
  isDaySelected(day: string) {
    return this.selectedWeekDays.includes(day);
  }

  //Cmabiar el estado de seleccion de un dia de la semana
  toggleDaySelection(day: string) {
    if (this.isDaySelected(day)) {
      this.selectedWeekDays = this.selectedWeekDays.filter((d) => d !== day);
    } else {
      this.selectedWeekDays.push(day);
    }
    this.InformationCompleteVerification(); // Llamar al método para verificar la información completa
  }

  InformationCompleteVerification() {
    // Verificar si la información requerida está completa
    if (
      this.selectedActivity &&
      this.selectedWeekDays.length > 0 &&
      this.selectedTime !== ''
    ) {
      this.InformationComplete = false; // Deshabilita el boton si se selecionan los campos
    } else {
      this.InformationComplete = true; // Habilita el boton si no se selecionan los campos
    }
  }

  //Boton para guardar datos de lo selecionado
  applyChanges() {
    const routineData = {
      activity: this.selectedActivity,
      days: this.selectedWeekDays,
      time: this.selectedTime,
    };

    this.scheduleNotification(routineData);

    this.popOveCtlr.dismiss(routineData);
  }

  enviarNotificacion() {
    const notification: ScheduleOptions = {
      notifications: [
        {
          title: '¡Notificación de prueba!',
          body: 'Esta es una notificación de prueba',
          id: 1,
          schedule: {
            at: new Date(Date.now() + 5000), // Programa la notificación para 5 segundos en el futuro
          },
        },
      ],
    };

    LocalNotifications.schedule(notification);
    console.log('So');
  }

  async scheduleNotification(routineData: any) {
    const { activity, days, time } = routineData;
    const [hours, minutes] = time.split(':');
    const selectedDays = days.map((day: string) => this.getWeekDayIndex(day));

    try {
      const currentPosition: GeolocationPosition = await Geolocation.getCurrentPosition();
      const lat = currentPosition.coords.latitude;
      const lng = currentPosition.coords.longitude;
      console.log('Posición actual obtenida:', lat, lng);

      this.http.getWeather(lat, lng).subscribe((weatherData: any) => {
        if (weatherData && weatherData.current_weather) {
          const temperature = weatherData.current_weather.temperature;
          console.log('Temperatura actual:', temperature);

          let message = '';
          switch (activity.name) {
            case 'Park':
              message = this.getParkNotificationMessage(temperature);
              break;
            case 'Exercise':
              message = this.getExerciseNotificationMessage(temperature);
              break;
            case 'Beach':
              message = this.getBeachNotificationMessage(temperature);
              break;
            case 'School':
              message = this.getSchoolNotificationMessage(temperature);
              break;
            case 'Cycling':
              message = this.getCyclingNotificationMessage(temperature);
              break;
            case 'Swimming':
              message = this.getSwimmingNotificationMessage(temperature);
              break;
            default:
              message = `No hay nada que notificar `;
          }

          const notification: ScheduleOptions = {
      notifications: [
        {
          title: activity.name,
          body: message, 
          id: 1,
          schedule: {
            on: selectedDays,
            at: new Date(new Date().setHours(Number(hours), Number(minutes))),
            repeats: true,
            every: 'week' as ScheduleEvery,
          },
          sound: '../../../assets/NotificationsSounds/DarlingOhayoNotification.mp3',
          smallIcon: activity.Image,
        },
      ],
    };
    console.log(notification)
    LocalNotifications.schedule(notification);
    console.log('Notificación programada con éxito!');
        } else {
          console.log('No hay datos de clima disponibles');
        }
      });
    } catch (error) {
      console.error('Error al obtener los datos del clima', error);
    }
  }

  getWeekDayIndex(day: string) {
    const weekDays = [null, 'D', 'L', 'M', 'Mi', 'J', 'V', 'S'];
    const index = weekDays.indexOf(day);
    console.log('Día seleccionado:', day);
    console.log('Índice:', index);
    return index;
  }

  //Validar mensajes segun la temperatura
  getParkNotificationMessage(temperature: number) {
    if (temperature >= 30) {
      return ' El dia esta mas hot que cuando viste mi rule 34. Mejor cuida tu piel ';
    } else if (temperature >= 20 && temperature < 30) {
      return 'El clima es perfecto para disfrutar del parque y ver lo patetica que es tu vida ';
    } else if (temperature >= 10 && temperature < 20) {
      return ' Si vas a ir lleva un abrigo para evitar un poco el frio ';
    } else {
      return 'Hace demasiado frío hoy. Mejor quedate en casa a ver anime perro ';
    }
  }

  getExerciseNotificationMessage(temperature: number) {
    if (temperature >= 30) {
      return ' Procura mantenerte hidratado durante el ejercicio ';
    } else if (temperature >= 20 && temperature < 30) {
      return ' Hoy es un gran dia para salir a ejercitarte flojo waton ';
    } else if (temperature >= 10 && temperature < 20) {
      return 'Lleva ropa ropa especial para evitar el frio ';
    } else {
      return ' Hace demasiado frio. Mejor quedate en casa a jugar Overwatch ';
    }
  }

  getBeachNotificationMessage(temperature: number) {
    if (temperature >= 30) {
      return ' El clima es perfecto para ir a la playa darse un baño ';
    } else if (temperature >= 20 && temperature < 30) {
      return ' Clima perfecto para ver a unas lindas chicas en traje de baño en la playa ';
    } else if (temperature >= 10 && temperature < 20) {
      return ' No creo que sea muy recomendable ir a la playa hoy';
    } else {
      return ' Ni de coña vayas hoy a la playa';
    }
  }

  getSchoolNotificationMessage(temperature: number) {
    if (temperature >= 30) {
      return 'Hace demasiado calor para ir a la escuela, mejor cubrete del sol en casa ';
    } else if (temperature >= 20 && temperature < 30) {
      return 'Es un clima perfecto como para disfrutarlo. No vayas a la escuela ';
    } else if (temperature >= 10 && temperature < 20) {
      return ' Hace algo de frio. Mejor mañana vamos a la escuela ';
    } else {
      return ' Hace demasiado frio, Ni de pedo iremos esta semana juasjuas ';
    }
  }

  getCyclingNotificationMessage(temperature: number) {
    if (temperature >= 30) {
      return ' No creo que sea buena idea ir a quemarse a lo pendejo ';
    } else if (temperature >= 20 && temperature < 30) {
      return '¡El clima es ideal para salir en bicicleta';
    } else if (temperature >= 10 && temperature < 20) {
      return ' Creo que con un abrigo estaras bien llendo en bicicleta ';
    } else {
      return ' Hay frio. Mejor un Overwatch';
    }
  } 

  getSwimmingNotificationMessage(temperature: number) {
    if (temperature >= 30) {
      return 'Con este calor es buena idea que si vayas hoy a la pisina ';
    } else if (temperature >= 20 && temperature < 30) {
      return ' Creo que sera divertido ir un rato  ';
    } else if (temperature >= 10 && temperature < 20) {
      return ' Mejor vamos otro dia ';
    } else {
      return ' Hace demasiado frio. Mejor hasta que el clima sea algo mas caluroso';
    }
  }

  Cancel() {
    this.popOveCtlr.dismiss();
  }

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
