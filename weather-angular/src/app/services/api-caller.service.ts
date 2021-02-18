import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';
import { LoginRes } from '../interfaces/login-res'

@Injectable({
  providedIn: 'root'
})

export class ApiCallerService {

  constructor(private client:HttpClient) {}
  private uri = "http://localhost:3001/auth/" 
<<<<<<< HEAD
  private uriIsLogged = "http://localhost:3001/checkLogin/"
  //const uri = "http://localhost:3001/auth/login";
=======
  
  const uri = "http://localhost:3001/auth/login";
>>>>>>> 0dcd8245f1fc35e9fef76e70a1ea9882acd7f56e

  const uriCurrent = "http://localhost:3001/weathers/current";
  
  const uriForecast = "http://localhost:3001/weathers/forecast";


  
  login = async ( email:string, password:string ) =>{
    const headers = new HttpHeaders().set( "email", email ).set( "password", password );
    return await this.client.get(this.uri+"login", {headers}).toPromise().then((res: LoginRes) => {
      sessionStorage.setItem("user", JSON.stringify({email, token: res.token}))
    });
  }

  register = async ( name:string, surname:string, username:string, email:string, password:string, country:string, city:string, unit:string ) =>
  await this.client.post(this.uri+"register",{name, surname, username, email, password, country, city, unit}).toPromise();

  logout = async () =>{
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("token",token);
    await this.client.delete(this.uri+"logout", { headers } )
  }

  isLogged = (): Promise<LoginRes> => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("token",token);
    return this.client.get(this.uriIsLogged, { headers } ).toPromise() as Promise<LoginRes>
  }  
  
    // CURRRENT

    const header= new HttpHeaders().set("unit",unit);
    return await this.client.get(this.uriCurrent+"/cities/:cityName",{cityName, header}).toPromise();
    }
  
    //FORECAST
    
    forecastCityName = async (cityName: string, unit: string) => {
    const header= new HttpHeaders().set("unit",unit);
    return await this.client.get(this.uriForecast+"/cities/:cityName",{cityName, header}).toPromise();
    }
  
  
    logout = async () {
     const headers = new HttpHeaders().set();
     return const response = await this.client.get(this.uri +"logout",{headers}).toPromise();
    }


  
}
