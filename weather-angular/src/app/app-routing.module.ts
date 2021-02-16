import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component'
import {LandPageComponent } from './components/land-page/land-page.component'
import {RegisterComponent} from './components/register/register.component'

const routes: Routes = [
  //{}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
