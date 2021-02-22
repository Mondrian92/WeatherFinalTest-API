import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthRes } from '../interfaces/auth-res';
import { User } from '../interfaces/user';
import { DataShareService } from 'src/app/services/data-share.service';
import { CurrentRes, ForecastRes } from '../interfaces/forecast';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class ApiCallerService {

  private uriAuth = "http://localhost:3001/auth/"
  private uriWeathers = "http://localhost:3001/weathers/";
  private uriCurrent = "http://localhost:3001/weathers/current";
  private uriForecast = "http://localhost:3001/weathers/forecast";
  private uriUpdates = "http://localhost:3001/updates";
  
  constructor(private client: HttpClient, private dataShareService: DataShareService, private router: Router) { }



  register = async (
    name: string, 
    surname: string, 
    username: string, 
    email: string, 
    password: string, 
    country: string, 
    city: string, 
    unit: string
    ): Promise<AuthRes> => await this.client.post(this.uriAuth + "register", { 
      name, 
      surname, 
      username, 
      email, 
      password, 
      country, 
      city, 
      unit }).toPromise() as Promise<AuthRes>;

  isLogged = async (): Promise<void> => {
    const token  = (sessionStorage.getItem("user") !== null) ? JSON.parse(sessionStorage.getItem("user")).token : ""
    const headers = new HttpHeaders().set("token", token);
    try{
      const resp = await this.client.get(this.uriAuth + "checkLogin", { headers }).toPromise() as Promise<AuthRes>
      if((await resp).isLogged) this.dataShareService.isUserLoggedIn.next(true)
    }catch(error){
      if(this.router.url == '/myweathers' || this.router.routerState.snapshot.url == ""){
        this.router.navigate(['login'])
      }
    }
  }
  
  login = async (email: string, password: string): Promise<AuthRes> => {
    const headers = new HttpHeaders().set("email", email).set("password", password);
    return await this.client.get(this.uriAuth + "login", { headers }).toPromise() as Promise<AuthRes>;
  }

  logout = async () => {
    const { token }= JSON.parse(sessionStorage.getItem("user"));
    const headers = new HttpHeaders().set("token", token);
    await this.client.delete(this.uriAuth + "logout", { headers }).toPromise();
  }

  getUserInfo = async (): Promise<User> =>{
    const { token }= JSON.parse(sessionStorage.getItem("user"));
    const headers = new HttpHeaders().set("token", token);
    return await this.client.get(this.uriAuth + "userInfo", {headers}).toPromise() as Promise<User>;
  }
  getCountriesList = async (): Promise<JSON> => await this.client.get(this.uriWeathers + "countries/list").toPromise() as Promise<JSON>

  //CURRENT  
  currentCityName = async (cityName: string, unit: string): Promise<CurrentRes> => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    return await this.client.get(this.uriCurrent + `/cities/${cityName}`, { headers }).toPromise() as Promise<CurrentRes>;
  }

  currentCityId = async (cityId: string, unit: string): Promise<CurrentRes> => {
    const headers = new HttpHeaders().set("unit", unit);
    return await this.client.get(this.uriCurrent + `/id/${cityId}`, { headers,  }).toPromise() as Promise<CurrentRes>;
  }

  currentZipCode = async (zipCode: string, countryCode: string, unit: string): Promise<CurrentRes> => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    return await this.client.get(this.uriCurrent + `/coutries/${countryCode}/zipcodes/${zipCode}`, { headers }).toPromise() as Promise<CurrentRes>;
  }

  currentCoordinates = async (long: string, lat: string, unit: string): Promise<CurrentRes> => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    return await this.client.get(this.uriCurrent + `/coordinates?long=${long}&lat=${lat}`, { headers }).toPromise() as Promise<CurrentRes>;
  }

  //FORECAST
  forecastCityName = async (cityName: string, unit: string): Promise<ForecastRes> => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    return await this.client.get(this.uriForecast + `/cities/${cityName}`, { headers }).toPromise() as Promise<ForecastRes>;
  }

  forecastCityId = async (cityId: string, unit: string): Promise<ForecastRes> => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    return await this.client.get(this.uriForecast + `/id/${cityId}`, { headers }).toPromise() as Promise<ForecastRes>;
  }

  forecastZipCode = async (zipCode: string, countryCode: string, unit: string): Promise<ForecastRes> => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    return await this.client.get(this.uriForecast + `/coutries/${countryCode}/zipcodes/${zipCode}`, { headers }).toPromise() as Promise<ForecastRes>;
  }

  forecastCoordinates = async (long: string, lat: string, unit: string): Promise<ForecastRes> => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    return await this.client.get(this.uriForecast + `/coordinates?long=${long}&lat=${lat}`, { headers }).toPromise() as Promise<ForecastRes>;
  }

  foreCoordAll = async (long: any, lat: any, unit: string): Promise<ForecastRes> => {
    const headers = new HttpHeaders().set("unit", unit);
    return await this.client.get(this.uriForecast + `/coordinates/all?long=${long}&lat=${lat}`, { headers }).toPromise() as Promise<ForecastRes>;
  }


  //UPDATES
  updateUsername = async (username: string) => {
    const body = username
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("token", token );
    await this.client.put(this.uriUpdates + "/username", {headers, body} ).toPromise();
  }

  updateCity = async (city: string) => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("token", token );
    await this.client.put(this.uriUpdates + "/city" , city , { headers } ).toPromise
  }

  updateCountry = async (country: string) => {
    const body = country
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("token", token );
    await this.client.put(this.uriUpdates + "/country", {headers, body}).toPromise();
  }

  updateUnit = async (unit: string) => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("token", token );
    await this.client.put(this.uriUpdates + "/unit", {headers, unit}).toPromise();
  }



}
