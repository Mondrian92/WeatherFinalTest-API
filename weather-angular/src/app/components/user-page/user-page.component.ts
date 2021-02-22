import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { Router } from '@angular/router';
import { countryCodes } from '../../../assets/countryCodes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  public myForm : FormGroup;

  public name:string
  public surname:string
  public username:string
  public email:string
  public password:string
  public country:string
  public city:string
  public unit:string

  private usernameInfo:string
  private countryInfo:string
  private cityInfo:string
  private unitInfo:string

  public alreadyExist: boolean = false
  countryCodes
  
  units = { metric: 'Celsius',
  imperial: 'Farenheit',
  standard: 'Kelvin'
  }
  constructor(private fc: FormBuilder, private apiCaller:ApiCallerService, private router:Router, private dataShareService: DataShareService) { }

  ngOnInit(): void {
    this.apiCaller.isLogged();
    this.getUserInfo();
    this.countryCodes = countryCodes;
    this.createForm();
    
  }

  createForm(){
    this.myForm = this.fc.group({
      username:['', Validators.required ],
      city: ['', Validators.required ],
      country:['', Validators.required ],
      unit:['', Validators.required ],
    })
  }

    getUserInfo = async() =>{
      const userInfos = await this.apiCaller.getUserInfo()
      this.email = userInfos.email
      this.name = userInfos.name
      this.surname = userInfos.surname
      this.usernameInfo = userInfos.username
      this.username = userInfos.username
      this.countryInfo = userInfos.country
      this.country = userInfos.country
      this.cityInfo = userInfos.city
      this.city = userInfos.city
      this.unitInfo = userInfos.unit
      this.unit = userInfos.unit
    }

  updateInformation = async () =>{ 
    console.log(this.city)
    if(this.username != this.usernameInfo) await this.apiCaller.updateUsername(this.username)
    if(this.unit != this.unitInfo) await this.apiCaller.updateUnit(this.unit)
    if(this.country != this.countryInfo) await this.apiCaller.updateCountry(this.country)
    if(this.city != this.cityInfo) await this.apiCaller.updateCity(this.city)
  }

}
