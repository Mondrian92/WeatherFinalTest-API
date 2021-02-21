import { Component, OnInit } from '@angular/core';
import { City, ForecastRes, mappedForecast } from 'src/app/interfaces/forecast';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css']
})
export class LandPageComponent implements OnInit {

  longitude: number
  latitude: number
  forecast: ForecastRes | undefined 
  displayedColumns: string[] = [
    "date",
    "average",
    "minimum", 
    "maximum", 
    "pressure",
    "humidity",
    "wind",
    "condition",
    "icon"
  ]

  constructor(private callService: ApiCallerService, private dataShareService: DataShareService) {}

  ngOnInit(): void {
    this.getLocation()   
  }


  getLocation(): void {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude;
          this.forecast = await this.callService.foreCoordAll(this.longitude, this.latitude, "metric")
        });
    } else {
       console.log("No support for geolocation")
    }
  }

  get mappedForecast(): mappedForecast {
    return this.forecast?.forecast.reduce((acc,value) => {
      const date = value.time.split(" ", 1)[0]
      return {
        ...acc,
        [date]: [...(acc[date] ? acc[date] : []), value]
      }
    }, {} )
  }

  get grouppedForecast(): string[] {
    return Object.keys(this.mappedForecast)
  }

  get city(): City {
    return this.forecast?.city
  }
}
