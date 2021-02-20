import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandPageComponent } from './components/land-page/land-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ApiCallerService } from './services/api-caller.service';
import { DataShareService } from './services/data-share.service';

//Material
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { MatToolbarModule }from '@angular/material/toolbar'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatSelectModule} from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table'; 
import { MatCardModule } from '@angular/material/card'; 
import { HiddenNavComponent } from './components/hidden-nav/hidden-nav.component'; 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    LandPageComponent,
    HiddenNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [
    ApiCallerService,
    DataShareService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
