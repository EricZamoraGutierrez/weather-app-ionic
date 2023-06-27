import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent  implements OnInit {
    position= { 
      latitude: 0,
      longitude: 0
    };
  
    weather: any;
  
    ngOnInit(): void {
      this.getWeatherNow();
    }
  
    constructor(private http: HttpService) { }
  
  
  getWeatherNow = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.http.getWeather(coordinates.coords.latitude, coordinates.coords.longitude).subscribe((data) => {
      console.log(data);
      this.weather = data;
    })
  } 
}
