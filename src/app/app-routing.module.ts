import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutertuteurComponent } from './home/views/admin/ajoutertuteur/ajoutertuteur.component';
import { ArticlesComponent } from './home/views/admin/articles/articles.component';
import { ArticlestatComponent } from './home/views/admin/articlestat/articlestat.component';
import { ListtuteurComponent } from './home/views/admin/listtuteur/listtuteur.component';
import { ProfileadminComponent } from './home/views/admin/profileadmin/profileadmin.component';
import { ReclamationeducativesComponent } from './home/views/admin/reclamationeducatives/reclamationeducatives.component';
import { ReclamationtechniquesComponent } from './home/views/admin/reclamationtechniques/reclamationtechniques.component';
import { StatistiquesComponent } from './home/views/admin/statistiques/statistiques.component';
import { StatistiquesusersComponent } from './home/views/admin/statistiquesusers/statistiquesusers.component';
import { UpdatearticleComponent } from './home/views/admin/updatearticle/updatearticle.component';
import { ListitemsComponent } from './home/views/etudiant/listitems/listitems.component';
import { ListreclamationsComponent } from './home/views/etudiant/listreclamations/listreclamations.component';
import { ProfileetudiantComponent } from './home/views/etudiant/profileetudiant/profileetudiant.component';
import { ReclamationformComponent } from './home/views/etudiant/reclamationform/reclamationform.component';
import { ShopComponent } from './home/views/etudiant/shop/shop.component';
import { ForgotpasswordComponent } from './home/views/forgotpassword/forgotpassword.component';
import { AjouterpostgroupeComponent } from './home/views/groupe/ajouterpostgroupe/ajouterpostgroupe.component';
import { ListgroupsComponent } from './home/views/groupe/listgroups/listgroups.component';
import { ListinvitationComponent } from './home/views/groupe/listinvitation/listinvitation.component';
import { MongroupeComponent } from './home/views/groupe/mongroupe/mongroupe.component';
import { RendezvousgroupeComponent } from './home/views/groupe/rendezvousgroupe/rendezvousgroupe.component';
import { LoginComponent } from './home/views/login/login.component';
import { NotFoundComponent } from './home/views/not-found/not-found.component';
import { RegisterComponent } from './home/views/register/register.component';
import { ResetpasswordComponent } from './home/views/resetpassword/resetpassword.component';
import { ProfiletuteurComponent } from './home/views/tuteur/profiletuteur/profiletuteur.component';
import { ReclamationtuteurComponent } from './home/views/tuteur/reclamationtuteur/reclamationtuteur.component';
import { WelcomepageComponent } from './home/views/welcomepage/welcomepage.component';


const routes: Routes = [
  {path: '' , redirectTo: 'register', pathMatch:"full"},
  {path:"back",loadChildren:()=>

    import('./home/views/back/back.module').then(m=>(m).BackModule)},
    {path:"front",loadChildren:()=>

      import('./home/views/front/front.module').then(m=>(m).FrontModule)},
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
  { path: 'reset-password', component: ResetpasswordComponent },

  { path: 'reclamation-statistiques', component: StatistiquesComponent },
  { path: 'user-statistiques', component: StatistiquesusersComponent },
  { path: 'list-groups', component: ListgroupsComponent },
  { path: 'list-invitations', component: ListinvitationComponent },
  { path: 'mongroupe', component: MongroupeComponent },
  { path: 'groupepost', component: AjouterpostgroupeComponent },
  { path: 'rendezvousgroupe', component: RendezvousgroupeComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'update-articles/:id', component: UpdatearticleComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'listitems', component: ListitemsComponent },
  { path: 'statartic', component: ArticlestatComponent },
  { path:"**",component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
