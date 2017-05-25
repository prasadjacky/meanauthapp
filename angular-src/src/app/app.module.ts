import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
//import { DialogModule } from 'primeng/primeng';
//import { Ng2DynamicDialogModule }  from 'ng2-dynamic-dialog';
import {PopupModule} from 'ng2-opd-popup';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { QualificationComponent } from './components/qualification/qualification.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    RegisterComponent,
    QualificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    PopupModule.forRoot()
    //DialogModule,
    //BrowserAnimationsModule
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
