import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-weathers',
  templateUrl: './my-weathers.component.html',
  styleUrls: ['./my-weathers.component.css']
})
export class MyWeathersComponent implements OnInit {
  cityId:string;
  cityName:string;
  zipCode:string;
  lat:string;
  lon:string;
  constructor() { }

  ngOnInit(): void {
  }

  checkInput = (input : string) => {
    return ( (this.cityId != null && input != this.cityId) || 
    (this.cityName != null && input != this.cityName) || 
    (this.zipCode != null && input != this.zipCode) || 
    (this.lat != null && input != this.lat) || 
    (this.lon != null && input != this.lon) )
  }
  

}
