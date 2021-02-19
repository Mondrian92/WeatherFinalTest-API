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

formLogin = async () => {
  try{
      const res = await this.apicaller.login(this.email, this.password)
      sessionStorage.setItem("user", JSON.stringify({email: this.email, token: res.token}))
  }catch(error){
      alert(error.error.Error)
      console.log(error);
            
  }
  }
}
