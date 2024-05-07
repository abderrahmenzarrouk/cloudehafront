import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResetpasswordformComponent } from './home/view/resetpasswordform/resetpasswordform.component';
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
import { BackModule } from './home/views/back/back.module';
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

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    WelcomepageComponent,
    LoginComponent,
    ProfileetudiantComponent,
    ProfileadminComponent,
    AjoutertuteurComponent,
    ListtuteurComponent,
    ReclamationformComponent,
    ListreclamationsComponent,
    ReclamationtechniquesComponent,
    ReclamationeducativesComponent,
    ProfiletuteurComponent,
    ReclamationtuteurComponent,
    ForgotpasswordComponent,
    ResetpasswordformComponent,
    ResetpasswordComponent,
    NotFoundComponent,
    StatistiquesComponent,
    StatistiquesusersComponent,
    ListgroupsComponent,
    ListinvitationComponent,
    MongroupeComponent,
    AjouterpostgroupeComponent,
    RendezvousgroupeComponent,
    ArticlesComponent,
    UpdatearticleComponent,
    ShopComponent,
    ListitemsComponent,
    ArticlestatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    BackModule,
    CommonModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
