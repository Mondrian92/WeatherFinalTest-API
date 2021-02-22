import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Our componenets
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandPageComponent } from './components/land-page/land-page.component';
import { ApiCallerService } from './services/api-caller.service';
import { DataShareService } from './services/data-share.service';
import { UserPageComponent } from './components/user-page/user-page.component';
import { MyWeathersComponent } from './components/my-weathers/my-weathers.component'; 

//Material
import { MatFormFieldModule } from '@angular/material/form-field'; 
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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    LandPageComponent,
    HiddenNavComponent,
    MyWeathersComponent,
    UserPageComponent
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
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    MatDividerModule,
    MatRadioModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiCallerService,
    DataShareService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
