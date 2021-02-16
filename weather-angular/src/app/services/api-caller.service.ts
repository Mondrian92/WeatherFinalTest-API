import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiCallerService {

  constructor(private client:HttpClient) {}

  login = async ( email:string, password:string ) =>{
    const uri = "http://localhost:3001/auth/login";
    const headers = new HttpHeaders().set( "email", email ).set( "password", password );
    const response = await this.client.get(uri, {headers}).toPromise();
  }

  isLogged = () => {
    
    return this.client.get("http://localhost:3001/checkLogin/").toPromise()
  }
  
}
