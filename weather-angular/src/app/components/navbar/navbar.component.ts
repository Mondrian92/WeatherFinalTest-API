import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { AuthRes } from '../../interfaces/auth-res'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private callService: ApiCallerService) { }

  ngOnInit(): void {
  }

  isLogged = async (): Promise<boolean> => {
    await this.callService.isLogged() 
    return await this.callService.isLogged().then(res => res.isLogged === true ? true : false)
}
  
  logout = async () => {
    try{
      const user= JSON.parse(sessionStorage.getItem("user"));
      await this.callService.logout(user.token);
      sessionStorage.removeItem("user");
    }catch(error){
      console.log(error.error.Error)
    }
  }
  
}
