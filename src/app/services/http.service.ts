import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  getWeather(lat: number, lng: number) {
    const locatedURL: string = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude="+ lng + "&hourly=temperature_2m,apparent_temperature,precipitation_probability,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto";
    console.log(locatedURL)

    return this.http.get(locatedURL);
  }

  getDailyWeather(lat: number, lng: number) {
    const locatedURL: string = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude="+ lng + "&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability&current_weather=true&timezone=auto";
    console.log(locatedURL)

    return this.http.get(locatedURL);

  }
}
