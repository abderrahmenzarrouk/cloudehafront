import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './home/views/register/register.component';
import { WelcomepageComponent } from './home/views/welcomepage/welcomepage.component';
import { LoginComponent } from './home/views/login/login.component';
import { ProfileetudiantComponent } from './home/views/etudiant/profileetudiant/profileetudiant.component';
import { ProfileadminComponent } from './home/views/admin/profileadmin/profileadmin.component';
import { AjoutertuteurComponent } from './home/views/admin/ajoutertuteur/ajoutertuteur.component';
import { ListtuteurComponent } from './home/views/admin/listtuteur/listtuteur.component';
import { ReclamationformComponent } from './home/views/etudiant/reclamationform/reclamationform.component';
import { ListreclamationsComponent } from './home/views/etudiant/listreclamations/listreclamations.component';
import { ReclamationtechniquesComponent } from './home/views/admin/reclamationtechniques/reclamationtechniques.component';
import { ReclamationeducativesComponent } from './home/views/admin/reclamationeducatives/reclamationeducatives.component';
import { ProfiletuteurComponent } from './home/views/tuteur/profiletuteur/profiletuteur.component';
import { ReclamationtuteurComponent } from './home/views/tuteur/reclamationtuteur/reclamationtuteur.component';
import { ForgotpasswordComponent } from './home/views/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './home/views/resetpassword/resetpassword.component';

const routes: Routes = [
  {path: '' , redirectTo: 'register', pathMatch:"full"},
  { path: 'register', component: RegisterComponent },
  { path: 'verifiermail', component: WelcomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile-etudiant', component: ProfileetudiantComponent },
  { path: 'profile-admin', component: ProfileadminComponent },
  { path: 'ajouter-tuteur', component: AjoutertuteurComponent },
  { path: 'list-tuteur', component: ListtuteurComponent },
  { path: 'reclamation', component: ReclamationformComponent },
  { path: 'list-reclamation', component: ListreclamationsComponent },
  { path: 'reclamations-techniques', component: ReclamationtechniquesComponent },
  { path: 'reclamations-educatives', component: ReclamationeducativesComponent },
  { path: 'profile-tuteur', component: ProfiletuteurComponent },
  { path: 'reclamation-tuteur', component: ReclamationtuteurComponent },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: 'reset-password', component: ResetpasswordComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
