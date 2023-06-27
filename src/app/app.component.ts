import { Component } from '@angular/core';
import { ThemesService } from './services/themes.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private theme: ThemesService) {}
  Date = new Date();
  ngOnInit() {
    this.theme.getTheme();

    if(this.Date.getHours()>19 || this.Date.getHours()<6){
      //aqui hay que poner el fondo que va de noche
      console.log("noche");
    }
    else{ 
      //aqui hay que poner el fondo que va de dia
      console.log("dia");
    }
  }
}
