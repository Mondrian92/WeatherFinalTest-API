import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiCallerService]
})
export class LoginComponent implements OnInit {

public email: string;
public password: string;

constructor(private apicaller:ApiCallerService) { }
 

  ngOnInit(): void {
  }
//async
  formLogin = async () =>{
   return await this.apicaller.login(this.email, this.password)
  }

}
