import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReseventsComponent } from './resevents/resevents.component';

const routes: Routes = [

  { path: 'resevents', component:ReseventsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReseventsRoutingModule { }
