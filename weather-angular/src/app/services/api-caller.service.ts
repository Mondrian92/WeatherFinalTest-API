import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { AuthRes } from '../interfaces/auth-res';
import { DataShareService } from 'src/app/services/data-share.service';


@Injectable({
  providedIn: 'root'
})

export class ApiCallerService {

  private uriAuth = "http://localhost:3001/auth/"
  private uriWeathers = "http://localhost:3001/weathers/";
  private uriCurrent = "http://localhost:3001/weathers/current";
  private uriForecast = "http://localhost:3001/weathers/forecast";
  private uriUpdates = "http://localhost:3001/updates";
  
  constructor(private client: HttpClient, private dataShareService: DataShareService) { }



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

  isLogged = async (): Promise<AuthRes> => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("token", token);
    //this.dataShareService.isUserLoggedIn.next(true);
    return await this.client.get(this.uriAuth + "checkLogin", { headers }).toPromise() as Promise<AuthRes>
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

  getCountriesList = async (): Promise<JSON> => await this.client.get(this.uriWeathers + "countries/list").toPromise() as Promise<JSON>

  //CURRENT  
  currentCityName = async (cityName: string, unit: string) => {
    const headers = new HttpHeaders().set("unit", unit);
    const params = new HttpParams().set("city", cityName);
    return await this.client.get(this.uriCurrent + "/cities/:cityName", { headers, params }).toPromise();
  }

  currentCityId = async (cityId: string, unit: string) => {
    const headers = new HttpHeaders().set("unit", unit);
    const params = new HttpParams().set("cityId", cityId);
    return await this.client.get(this.uriCurrent + "/id/:cityId", { headers, params }).toPromise();
  }

  currentZipCode = async (zipCode: string, countryCode: string, unit: string) => {
    const headers = new HttpHeaders().set("unit", unit);
    const params = new HttpParams();
    params.append("zipCode", zipCode);
    params.append("countryCode", countryCode)
    return await this.client.get(this.uriCurrent + "/coutries/:countryCode/zipcodes/:zipCode", { headers, params }).toPromise();
  }

  currentCoordinates = async (long: string, lat: string, unit: string) => {
    const headers = new HttpHeaders().set("unit", unit);
    return await this.client.get(this.uriCurrent + `/coordinates?long=${long}&lat=${lat}`, { headers }).toPromise();
  }

  //FORECAST
  forecastCityName = async (cityName: string, unit: string) => {
    const headers = new HttpHeaders().set("unit", unit);
    const params = new HttpParams().set("city", cityName);
    return await this.client.get(this.uriForecast + "/cities/:cityName", { headers, params }).toPromise();
  }

  forecastCityId = async (cityId: string, unit: string) => {
    const headers = new HttpHeaders().set("unit", unit);
    const params = new HttpParams().set("cityId", cityId);
    return await this.client.get(this.uriForecast + "/id/:cityId", { headers, params }).toPromise();
  }

  forecastZipCode = async (zipCode: string, countryCode: string, unit: string) => {
    const headers = new HttpHeaders().set("unit", unit);
    const params = new HttpParams();
    params.append("zipCode", zipCode);
    params.append("countryCode", countryCode)
    return await this.client.get(this.uriForecast + "/coutries/:countryCode/zipcodes/:zipCode", { headers, params }).toPromise();
  }

  forecastCoordinates = async (long: string, lat: string, unit: string) => {
    const headers = new HttpHeaders().set("unit", unit);
    return await this.client.get(this.uriForecast + `/coordinates?long=${long}&lat=${lat}`, { headers }).toPromise();
  }

  foreCoordAll = async (long: any, lat: any, unit: string) => {
    console.log("longin: ", long, ",latin: ", lat);
    
    const headers = new HttpHeaders().set("unit", unit);
    return await this.client.get(this.uriForecast + `/coordinates/all?long=${long}&lat=${lat}`, { headers }).toPromise();
  }


  //UPDATES
  updateUsername = async (username: string) => {
    await this.client.put(this.uriUpdates + "/username", { username }).toPromise();
  }

  updateCity = async (city: string) => {
    await this.client.put(this.uriUpdates + "/city", { city }).toPromise();
  }

  updateCountry = async (country: string) => {
    await this.client.put(this.uriUpdates + "/country", { country }).toPromise();
  }

  updateUnit = async (unit: string) => {
    await this.client.put(this.uriUpdates + "/unit", { unit }).toPromise();
  }



}
