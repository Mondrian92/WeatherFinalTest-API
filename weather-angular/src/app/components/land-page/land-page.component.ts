import { Component, OnInit } from '@angular/core';
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
  forecast
  displayedColumns: string[] = ["date","temperature","wind","condition"]
  constructor(private callService: ApiCallerService, private dataShareService: DataShareService) { 
  //   this.dataShareService.forecast.subscribe( value => {
  //     this.forecast = value;    
  // });
  }

  async ngOnInit(): Promise<void> {
    this.getLocation()   
    console.log(this.forecast);
    
  }


  getLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude;

          this.forecast = this.callService.foreCoordAll(this.longitude, this.latitude, "metric")
          //this.dataShareService.forecast
          console.log(this.forecast);
        });
        
    } else {
       console.log("No support for geolocation")
    }
  }

}
