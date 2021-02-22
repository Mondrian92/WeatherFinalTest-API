import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { LandPageComponent } from './components/land-page/land-page.component'
import { RegisterComponent } from './components/register/register.component'
import { MyWeathersComponent } from './components/my-weathers/my-weathers.component';
import {UserPageComponent} from './components/user-page/user-page.component'


const routes: Routes = [
  {
    path: "",
    component: LandPageComponent 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'myweathers',
    component: MyWeathersComponent
  },
  {
    path: 'userPage',
    component: UserPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
