import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { Router } from '@angular/router'
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiCallerService]
})
export class LoginComponent implements OnInit {

public email: string;
public password: string;

constructor(private apicaller:ApiCallerService, private router:Router, private dataShareService: DataShareService) { }
 

ngOnInit(): void {

}

formLogin = async () => {
  try{
    const res = await this.apicaller.login(this.email, this.password)
    sessionStorage.setItem("user", JSON.stringify({email: this.email, token: res.token}))
    this.dataShareService.isUserLoggedIn.next(true);
    this.router.navigate(['/'])
  }catch(error){
    alert(error.error.Error)
    console.log(error);
  }}
}
