import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { AuthRes } from '../interfaces/auth-res';
import { DataShareService } from 'src/app/services/data-share.service';
import { Forecast, ForecastRes } from '../interfaces/forecast';


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

  isLogged = async (): Promise<void> => {
    const { token } = JSON.parse(sessionStorage.getItem("user"));
    // const { token } = (sessionStorage.getItem("user")==undefined) ? JSON.parse(sessionStorage.getItem("user")) : ""
    const headers = new HttpHeaders().set("token", token);
    const resp = await this.client.get(this.uriAuth + "checkLogin", { headers }).toPromise() as Promise<AuthRes>
    if((await resp).isLogged) this.dataShareService.isUserLoggedIn.next(true);
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
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    return await this.client.get(this.uriCurrent + `/cities/${cityName}`, { headers }).toPromise();
  }

  currentCityId = async (cityId: string, unit: string) => {
    const headers = new HttpHeaders().set("unit", unit);
    return await this.client.get(this.uriCurrent + `/id/${cityId}`, { headers,  }).toPromise();
  }

  currentZipCode = async (zipCode: string, countryCode: string, unit: string) => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    return await this.client.get(this.uriCurrent + `/coutries/${countryCode}/zipcodes/${zipCode}`, { headers }).toPromise();
  }

  currentCoordinates = async (long: string, lat: string, unit: string) => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    return await this.client.get(this.uriCurrent + `/coordinates?long=${long}&lat=${lat}`, { headers }).toPromise();
  }

  //FORECAST
  forecastCityName = async (cityName: string, unit: string) => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    const params = new HttpParams().set("city", cityName);
    return await this.client.get(this.uriForecast + `/cities/${cityName}`, { headers, params }).toPromise();
  }

  forecastCityId = async (cityId: string, unit: string) => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    const params = new HttpParams().set("cityId", cityId);
    return await this.client.get(this.uriForecast + `/id/${cityId}`, { headers, params }).toPromise();
  }

  forecastZipCode = async (zipCode: string, countryCode: string, unit: string) => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    const params = new HttpParams();
    params.append("zipCode", zipCode);
    params.append("countryCode", countryCode)
    return await this.client.get(this.uriForecast + `/coutries/${countryCode}/zipcodes/${zipCode}`, { headers, params }).toPromise();
  }

  forecastCoordinates = async (long: string, lat: string, unit: string) => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    return await this.client.get(this.uriForecast + `/coordinates?long=${long}&lat=${lat}`, { headers }).toPromise();
  }

  foreCoordAll = async (long: any, lat: any, unit: string): Promise<ForecastRes> => {
    const headers = new HttpHeaders().set("unit", unit);
    return await this.client.get(this.uriForecast + `/coordinates/all?long=${long}&lat=${lat}`, { headers }).toPromise() as Promise<ForecastRes>;
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
