import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  position = {
    latitude: 0,
    longitude: 0
  };
  //daysarray
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // daily
  dailyWeather = {
    date: '',
    temp: 0,
    icon: '',
    precipitation: 0,
    sunrise: '',
    sunset: '',
    tempMax: 0,
    tempMin: 0,
    description: '',
    windspeed: 0,
  };

  //tomorrow
  tomorrowWeather = {
    date: '',
    temp: 0,
    icon: '',
    precipitation: 0,
    sunrise: '',
    sunset: '',
    tempMax: 0,
    tempMin: 0,
    description: '',
    windspeed: 0,
  };

  //weekly
  weeklyWeather: any = [
    {
      date: '',
      temp: 0,
      icon: '',
      description: ''
    }
  ];
  //getTodayName
  dayno = new Date().getDay();
  dayname = this.days[this.dayno];
  dayTomorrow = this.days[this.dayno + 1];

  // weather data
  weather: any;

  //On Init get weather
  ngOnInit(): void {
    this.getWeatherNow();
  }

  constructor(private http: HttpService) { }


  getWeatherNow = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.http.getDailyWeather(coordinates.coords.latitude, coordinates.coords.longitude).subscribe((data) => {
      console.log(data);
      this.weather = data;

      this.setDailyWeather(
        this.dayname,
        this.weather.current_weather.temperature,
        this.weather.current_weather.weathercode,
        this.weather.daily.precipitation_probability_max[0],
        this.weather.daily.sunrise[0].split("T").pop(),
        this.weather.daily.sunset[0].split("T").pop(),
        this.weather.daily.temperature_2m_min[0],
        this.weather.daily.temperature_2m_max[0],
        this.weatherDescription(this.weather.current_weather.weathercode),
        this.weather.current_weather.windspeed
      );

      this.setTomorrowWeather(
        this.dayTomorrow,
        this.weather.hourly.temperature_2m[23],
        this.weather.daily.weathercode[1],
        this.weather.daily.precipitation_probability_max[1],
        this.weather.daily.sunrise[1].split("T").pop(),
        this.weather.daily.sunset[1].split("T").pop(),
        this.weather.daily.temperature_2m_min[1],
        this.weather.daily.temperature_2m_max[1],
        this.weatherDescription(this.weather.daily.weathercode[1]),
      )
    })
  }

  setDailyWeather(date: any, temp: any, icon: any, precipitation: any,
    sunrise: any, sunset: any, tempMin: any, tempMax: any,
    description: any, windspeed: any) {
    this.dailyWeather.date = date;
    this.dailyWeather.temp = temp;
    this.dailyWeather.icon = icon;
    this.dailyWeather.description = description;
    this.dailyWeather.windspeed = windspeed;
    this.dailyWeather.precipitation = precipitation;
    this.dailyWeather.sunrise = sunrise;
    this.dailyWeather.sunset = sunset;
    this.dailyWeather.tempMin = tempMin;
    this.dailyWeather.tempMax = tempMax;
    console.log(this.dailyWeather);
  }

  setTomorrowWeather(date: any, temp: any, icon: any, precipitation: any,
    sunrise: any, sunset: any, tempMin: any, tempMax: any,
    description: any) {
    this.tomorrowWeather.date = date;
    this.tomorrowWeather.temp = temp;
    this.tomorrowWeather.icon = icon;
    this.tomorrowWeather.description = description;
    this.tomorrowWeather.precipitation = precipitation;
    this.tomorrowWeather.sunrise = sunrise;
    this.tomorrowWeather.sunset = sunset;
    this.tomorrowWeather.tempMin = tempMin;
    this.tomorrowWeather.tempMax = tempMax;
    console.log(this.tomorrowWeather);
  }

  //convert weathercode to weather description
  weatherDescription = (code: any) => {
    switch (code) {
      case 0:
        return 'Clear sky';
      case 1:
        return 'Mainly clear';
      case 2:
        return 'Partly cloudy';
      case 3:
        return 'Overcast';
      case 45:
        return 'Fog';
      case 48:
        return 'Fog patches';
      case 51:
        return 'Light drizzle';
      case 53:
        return 'Moderate drizzle';
      case 55:
        return 'Dense drizzle';
      case 56:
        return 'Light freezing drizzle';
      case 57:
        return 'Heavy freezing drizzle';
      case 61:
        return 'Slight rain';
      case 63:
        return 'Moderate rain';
      case 65:
        return 'Heavy rain';
      case 66:
        return 'Freezing rain';
      case 67:
        return 'Heavy freezing rain';
      case 71:
        return 'Light snowfall';
      case 73:
        return 'Moderate snowfall';
      case 75:
        return 'Heavy snowfall';
      case 77:
        return 'Snow grains';
      case 80:
        return 'Slight rain shower';
      case 81:
        return 'Moderate rain shower';
      case 82:
        return 'Heavy rain shower';
      case 85:
        return 'Light snow shower';
      case 86:
        return 'Heavy snow shower';
      default:
        return 'Clear sky';

    }
  }

}

