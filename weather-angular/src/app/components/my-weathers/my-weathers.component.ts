import { Component, OnInit } from '@angular/core';
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
  res

  countryCodes

  constructor(private apicaller: ApiCallerService) { }

  ngOnInit(): void {
    this.countryCodes = countryCodes
  }

  chooseCall(): void {
    console.log("ciao");
    
    if (this.mode === "current") {
      console.log("ciao2");
      console.log("choice");
      console.log(this.value);
      
      
      
      switch (this.searchChoice) {
        case "city":
          this.res = this.apicaller.currentCityName(
            this.value,
            JSON.parse(sessionStorage.getItem("user")).unit ?
              JSON.parse(sessionStorage.getItem("user")).unit :
              "metric"
          )
          console.log("res", this.res);
          break;
        case "cityid":
          this.res = this.apicaller.currentCityId(
            this.value,
            JSON.parse(sessionStorage.getItem("user")).unit ?
              JSON.parse(sessionStorage.getItem("user")).unit :
              "metric"
          )
          console.log("res", this.res);
          break;
        case "zipcode":
          this.res = this.apicaller.currentZipCode(
            this.value,
            this.country,
            JSON.parse(sessionStorage.getItem("user")).unit ?
              JSON.parse(sessionStorage.getItem("user")).unit :
              "metric"
          )
          console.log("res", this.res);
          break;
        case "coordinates":
          const coord = this.value.split(",")
          this.res = this.apicaller.currentCoordinates(
            coord[0],
            coord[1],
            JSON.parse(sessionStorage.getItem("user")).unit ?
              JSON.parse(sessionStorage.getItem("user")).unit :
              "metric"
          )
          console.log("res", this.res);
          
          break;
        default:
          break;
      }
    } else {

    }
  }


}
