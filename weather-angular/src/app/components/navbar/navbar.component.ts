import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { Router } from '@angular/router'
import { DataShareService } from 'src/app/services/data-share.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged: boolean
  constructor(private callService: ApiCallerService, private router: Router, private dataShareService: DataShareService) {}

  ngOnInit(): void {
   
    this.dataShareService.isUserLoggedIn.subscribe(value => {
      this.logged = value;
    });
    this.callService.isLogged()
  }

  logout = async () => {
    try {
      await this.callService.logout();
      sessionStorage.removeItem("user");
      this.logged = false
      this.router.navigate(['/'])
    } catch (error) {
      console.log(error)
    }
  }
}
