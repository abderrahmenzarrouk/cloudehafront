import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './home/views/register/register.component';
import { WelcomepageComponent } from './home/views/welcomepage/welcomepage.component';
import { LoginComponent } from './home/views/login/login.component';
import { ProfileetudiantComponent } from './home/views/etudiant/profileetudiant/profileetudiant.component';
import { ProfileadminComponent } from './home/views/admin/profileadmin/profileadmin.component';
import { AjoutertuteurComponent } from './home/views/admin/ajoutertuteur/ajoutertuteur.component';

const routes: Routes = [
  
  { path: 'register', component: RegisterComponent },
  { path: 'verifiermail', component: WelcomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile-etudiant', component: ProfileetudiantComponent },
  { path: 'profile-admin', component: ProfileadminComponent },
  { path: 'ajouter-tuteur', component: AjoutertuteurComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
