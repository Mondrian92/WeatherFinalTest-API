import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private callService: ApiCallerService) { }

  ngOnInit(): void {
  }
  
//logout= async () => await this.callService.logout()
  

//isLogged = (): boolean => {}
}
