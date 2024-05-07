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
import { StatistiquesComponent } from './home/views/admin/statistiques/statistiques.component';
import { StatistiquesusersComponent } from './home/views/admin/statistiquesusers/statistiquesusers.component';
import { ListgroupsComponent } from './home/views/groupe/listgroups/listgroups.component';
import { ListinvitationComponent } from './home/views/groupe/listinvitation/listinvitation.component';
import { MongroupeComponent } from './home/views/groupe/mongroupe/mongroupe.component';
import { AjouterpostgroupeComponent } from './home/views/groupe/ajouterpostgroupe/ajouterpostgroupe.component';
import { RendezvousgroupeComponent } from './home/views/groupe/rendezvousgroupe/rendezvousgroupe.component';
import { ArticlesComponent } from './home/views/admin/articles/articles.component';
import { UpdatearticleComponent } from './home/views/admin/updatearticle/updatearticle.component';
import { ShopComponent } from './home/views/etudiant/shop/shop.component';
import { ListitemsComponent } from './home/views/etudiant/listitems/listitems.component';
import { ArticlestatComponent } from './home/views/admin/articlestat/articlestat.component';
import { ClasseajoutComponent } from './home/views/admin/classeajout/classeajout.component';
import { AddclasseComponent } from './home/views/admin/addclasse/addclasse.component';
import { StatclasseComponent } from './home/views/admin/statclasse/statclasse.component';
import { ErrorpageComponent } from './home/views/errorpage/errorpage.component';
import { AuthAdminGuard } from './guards/admin/adminguard.guard';
import { AuthEtudiantGuard } from './guards/etudiant/etudiantguard.guard';


const routes: Routes = [
  {path: '' , redirectTo: 'register', pathMatch:"full"},
  { path: 'register', component: RegisterComponent },
  { path: 'verifiermail', component: WelcomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile-etudiant',canActivate:[AuthEtudiantGuard], component: ProfileetudiantComponent },
  { path: 'profile-admin',canActivate:[AuthAdminGuard], component: ProfileadminComponent },
  { path: 'ajouter-tuteur',canActivate:[AuthAdminGuard], component: AjoutertuteurComponent },
  { path: 'list-tuteur',canActivate:[AuthAdminGuard], component: ListtuteurComponent },
  { path: 'reclamation',canActivate:[AuthEtudiantGuard], component: ReclamationformComponent },
  { path: 'list-reclamation',canActivate:[AuthEtudiantGuard], component: ListreclamationsComponent },
  { path: 'reclamations-techniques',canActivate:[AuthAdminGuard], component: ReclamationtechniquesComponent },
  { path: 'reclamations-educatives',canActivate:[AuthAdminGuard], component: ReclamationeducativesComponent },
  { path: 'profile-tuteur',canActivate:[AuthEtudiantGuard], component: ProfiletuteurComponent },
  { path: 'reclamation-tuteur',canActivate:[AuthEtudiantGuard], component: ReclamationtuteurComponent },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: 'reset-password', component: ResetpasswordComponent },
  { path: 'reclamation-statistiques',canActivate:[AuthAdminGuard], component: StatistiquesComponent },
  { path: 'user-statistiques',canActivate:[AuthAdminGuard], component: StatistiquesusersComponent },
  { path: 'list-groups',canActivate:[AuthEtudiantGuard], component: ListgroupsComponent },
  { path: 'list-invitations',canActivate:[AuthEtudiantGuard], component: ListinvitationComponent },
  { path: 'mongroupe',canActivate:[AuthEtudiantGuard], component: MongroupeComponent },
  { path: 'groupepost',canActivate:[AuthEtudiantGuard], component: AjouterpostgroupeComponent },
  { path: 'rendezvousgroupe',canActivate:[AuthEtudiantGuard], component: RendezvousgroupeComponent },
  { path: 'articles',canActivate:[AuthAdminGuard], component: ArticlesComponent },
  { path: 'update-articles/:id',canActivate:[AuthAdminGuard], component: UpdatearticleComponent },
  { path: 'shop',canActivate:[AuthEtudiantGuard], component: ShopComponent },
  { path: 'listitems',canActivate:[AuthEtudiantGuard], component: ListitemsComponent },
  { path: 'statartic',canActivate:[AuthAdminGuard], component: ArticlestatComponent },
  { path: 'ajouterclasse',canActivate:[AuthAdminGuard], component: ClasseajoutComponent },
  { path: 'addclasse',canActivate:[AuthAdminGuard], component: AddclasseComponent },
  { path: 'statclass',canActivate:[AuthAdminGuard], component: StatclasseComponent },
  { path: 'error', component: ErrorpageComponent },

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
