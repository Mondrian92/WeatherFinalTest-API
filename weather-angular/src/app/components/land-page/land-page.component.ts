import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css']
})
export class LandPageComponent implements OnInit {

  longitude: number
  latitude: number

  constructor() { }

  ngOnInit(): void {
    this.getLocation()
  }


  getLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude;
          // this.callApi(longitude, latitude);
        });
    } else {
       console.log("No support for geolocation")
    }
  }

}
