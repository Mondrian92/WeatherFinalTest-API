import { Component, OnInit } from '@angular/core';
import { City, CurrentRes, ForecastRes, mappedForecast } from 'src/app/interfaces/forecast';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { countryCodes } from '../../../assets/countryCodes'

@Component({
  selector: 'app-my-weathers',
  templateUrl: './my-weathers.component.html',
  styleUrls: ['./my-weathers.component.css']
})
export class MyWeathersComponent implements OnInit {
  value: string;
  searchChoice: string
  country: string
  mode: string

  currentRes: CurrentRes
  forecastRes: ForecastRes

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

  countryCodes

  
  constructor(private apicaller: ApiCallerService) { }

  ngOnInit(): void {
    this.apicaller.isLogged();
    this.countryCodes = countryCodes 
  }

  async chooseCall(): Promise<void> {
    this.apicaller.isLogged()
    this.forecastRes = undefined
    this.currentRes = undefined
    if (this.mode === "current") {
      switch (this.searchChoice) {

        case "city":
          this.currentRes = await this.apicaller.currentCityName(
            this.value,
            JSON.parse(sessionStorage.getItem("user")).unit ?
              JSON.parse(sessionStorage.getItem("user")).unit :
              "metric"
          )
        break;

        case "cityid":
          this.currentRes = await this.apicaller.currentCityId(
            this.value,
            JSON.parse(sessionStorage.getItem("user")).unit ?
              JSON.parse(sessionStorage.getItem("user")).unit :
              "metric"
          )
        break;

        case "zipcode":
          this.currentRes = await this.apicaller.currentZipCode(
            this.value,
            this.country,
            JSON.parse(sessionStorage.getItem("user")).unit ?
              JSON.parse(sessionStorage.getItem("user")).unit :
              "metric"
          )
        break;

        case "coordinates":
          const coord = this.value.split(",")
          console.log(coord[0]);
          console.log(coord[1]);
          this.currentRes = await this.apicaller.currentCoordinates(
            coord[0],
            coord[1],
            JSON.parse(sessionStorage.getItem("user")).unit ?
              JSON.parse(sessionStorage.getItem("user")).unit :
              "metric"
          )
        break;

        default:
        break;   
      }
    } else {
      switch (this.searchChoice) {
        case "city":
          this.forecastRes = await this.apicaller.forecastCityName(
            this.value,
            JSON.parse(sessionStorage.getItem("user")).unit ?
              JSON.parse(sessionStorage.getItem("user")).unit :
              "metric"
          )
          break;
        case "cityid":
          this.forecastRes = await this.apicaller.forecastCityId(
            this.value,
            JSON.parse(sessionStorage.getItem("user")).unit ?
              JSON.parse(sessionStorage.getItem("user")).unit :
              "metric"
          )
          break;
        case "zipcode":
          this.forecastRes = await this.apicaller.forecastZipCode(
            this.value,
            this.country,
            JSON.parse(sessionStorage.getItem("user")).unit ?
              JSON.parse(sessionStorage.getItem("user")).unit :
              "metric"
          )
          break;
        case "coordinates":
          const coord = this.value.split(",")
          this.forecastRes = await this.apicaller.forecastCoordinates(
            coord[0],
            coord[1],
            JSON.parse(sessionStorage.getItem("user")).unit ?
              JSON.parse(sessionStorage.getItem("user")).unit :
              "metric"
          )
          break;
        default:
          break;
      }
    }
    
  }


  
//Forecast functions
  get mappedForecast(): mappedForecast {
    
    if(this.mode === "forecast" || this.mode !== undefined)
    return this.forecastRes?.forecast.reduce((acc,value) => {
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
    return this.forecastRes?.city
  }


}
