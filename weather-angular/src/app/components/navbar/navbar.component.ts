import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { AuthRes } from '../../interfaces/auth-res'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private callService: ApiCallerService) { }

  logged: boolean

  ngOnInit(): void {
    this.isLogged()
  }

  isLogged = async (): Promise<void> => {
    const{ isLogged } = await this.callService.isLogged()
    this.logged = isLogged
  }

  logout = async () => {
    try{
      const {token}= JSON.parse(sessionStorage.getItem("user"));
      await this.callService.logout(token);
      sessionStorage.removeItem("user");
    }catch(error){
      console.log(error)
    }
  } 
}
