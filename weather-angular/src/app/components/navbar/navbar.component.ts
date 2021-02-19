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
    return await this.callService.isLogged().then(res => res.isLogged === true ? true : false)
}
  
  logout = async () => {
    try{
      const {token}= JSON.parse(sessionStorage.getItem("user"));
      await this.callService.logout(token);
      sessionStorage.removeItem("user");
    }catch(error){
      console.log(error.error.Error)
    }
  }
  
}
