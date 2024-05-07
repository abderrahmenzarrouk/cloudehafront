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
import { ListtuteurComponent } from './home/views/admin/listtuteur/listtuteur.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReclamationformComponent } from './home/views/etudiant/reclamationform/reclamationform.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ListreclamationsComponent } from './home/views/etudiant/listreclamations/listreclamations.component';
import { ReclamationtechniquesComponent } from './home/views/admin/reclamationtechniques/reclamationtechniques.component';
import { ReclamationeducativesComponent } from './home/views/admin/reclamationeducatives/reclamationeducatives.component';
import { ProfiletuteurComponent } from './home/views/tuteur/profiletuteur/profiletuteur.component';
import { ReclamationtuteurComponent } from './home/views/tuteur/reclamationtuteur/reclamationtuteur.component';
import { ForgotpasswordComponent } from './home/views/forgotpassword/forgotpassword.component';
import { ResetpasswordformComponent } from './home/view/resetpasswordform/resetpasswordform.component';
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
import { BackModule } from './home/views/back/back.module';
import { ClssedispoComponent } from './home/views/etudiant/clssedispo/clssedispo.component';
import { CalendarDateFormatter, CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ReservationcalenderComponent } from './home/views/etudiant/reservationcalender/reservationcalender.component';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeFr,'fr');

class CustomDateFormatter extends CalendarNativeDateFormatter{
   public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale,{hour:'numeric',minute:'numeric'}).format(date);
   }
   public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale,{hour:'numeric',minute:'numeric'}).format(date);
    
  }   
  
}
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
    ArticlestatComponent,
    ClasseajoutComponent,
    AddclasseComponent,
    StatclasseComponent,
    ErrorpageComponent,
    ClssedispoComponent,
    ReservationcalenderComponent
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
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  
    
    
  
    
  ],
  providers: [{provide: CalendarDateFormatter,useClass :CustomDateFormatter}],
  bootstrap: [AppComponent]
})
export class AppModule { }
