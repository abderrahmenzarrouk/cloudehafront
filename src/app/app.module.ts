import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './home/views/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WelcomepageComponent } from './home/views/welcomepage/welcomepage.component';
import { LoginComponent } from './home/views/login/login.component';
import { ProfileetudiantComponent } from './home/views/etudiant/profileetudiant/profileetudiant.component';
import { ProfileadminComponent } from './home/views/admin/profileadmin/profileadmin.component';
import { AjoutertuteurComponent } from './home/views/admin/ajoutertuteur/ajoutertuteur.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    WelcomepageComponent,
    LoginComponent,
    ProfileetudiantComponent,
    ProfileadminComponent,
    AjoutertuteurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
