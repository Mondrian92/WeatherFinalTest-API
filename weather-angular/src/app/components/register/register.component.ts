import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { Router } from '@angular/router';
import { countryCodes } from '../../../assets/countryCodes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


//import * as countryList from './countryList.json'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  
  providers: [ApiCallerService]
})
export class RegisterComponent implements OnInit {
  public myForm : FormGroup;
  public name:string
  public surname:string
  public username:string
  public email:string
  public password:string
  public country:string
  public city:string
  public unit:string
  public alreadyExist: boolean = false
  countryCodes
  
  
  


  units = { metric: 'Celsius',
  imperial: 'Farenheit',
  standard: 'Kelvin'
  }
  
  constructor(private fc: FormBuilder, private apicaller:ApiCallerService, private router:Router, private dataShareService: DataShareService) { }

  ngOnInit(): void {
    this.countryCodes = countryCodes
    this.createForm()
  }

 createForm(){
    this.myForm = this.fc.group({
      name:['', Validators.required ],
      surname:['', Validators.required ],
      username:['', Validators.required ],
      email:['', Validators.required ],
      password:['', Validators.required],
      city: ['', Validators.required ],
      country:['', Validators.required ],
      unit:['', Validators.required ],
    })
  }

  formRegister = async () => {
    try{
      await this.apicaller.register(this.name, 
        this.surname, 
        this.username, 
        this.email, 
        this.password, 
        this.country, 
        this.city,
        this.unit)
      const res = await this.apicaller.login(this.email, this.password)
      sessionStorage.setItem("user", JSON.stringify({email: this.email, token: res.token}))
      this.dataShareService.isUserLoggedIn.next(true); ;
      this.router.navigate(['/'])     
    } catch(error) {
      alert(error.error.Error)      
    }
  }
}