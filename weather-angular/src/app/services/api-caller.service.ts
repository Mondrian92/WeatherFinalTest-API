import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})//'Origin',
//       'X-Requested-With',
//       'Content-Type',
//       'Accept',
//       'X-Access-Token',
//       '*'

export class ApiCallerService {

  constructor(private client:HttpClient) {}
  private uri = "http://localhost:3001/auth/" 
  login = async ( email:string, password:string ) =>{
//const uri = "http://localhost:3001/auth/login";

//const uriCurrent = "http://localhost:3001/weathers/current";
//const uriForecast = "http://localhost:3001/weathers/forecast";




    const headers = new HttpHeaders().set( "email", email ).set( "password", password ).set("Access-Control-Allow-Origin", "*");
    const response = await this.client.get(this.uri+"login", {headers}).toPromise();
  }

  register = async ( name:string, surname:string, username:string, email:string, password:string, country:string, city:string, unit:string ) =>
  await this.client.post(this.uri+"register",{name,surname,username,email,password,country,city, unit}).toPromise();


  
  //currentCityName = async (cityName: string, unit: string) =>{
  //const header= new HttpHeaders().set("unit",unit).set("Access-Control-Allow-Origin", "*");
  //await this.client.get(this.uriCurrent+"/cities/:cityName",{cityName, header}).toPromise();
  //}

  //forecastCityName = async (cityName: string, unit: string) =>{
  //const header= new HttpHeaders().set("unit",unit).set("Access-Control-Allow-Origin", "*");
  //await this.client.get(this.uriForecast+"/cities/:cityName",{cityName, header}).toPromise();
  //}


//logout = async {
// const headers = new HttpHeaders().set().set("Access-Control-Allow-Origin", "*");
// const response = await this.client.get(this.uri +"logout",{headers}).toPromise();
//}




  isLogged = () => {
    return this.client.get("http://localhost:3001/checkLogin/").toPromise()
  }
  
}