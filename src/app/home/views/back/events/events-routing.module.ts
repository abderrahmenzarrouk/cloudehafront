// events-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { AjouterEventComponent } from './ajouter-event/ajouter-event.component';

const routes: Routes = [
  { path: 'events', component: EventsComponent },
  { path: 'ajouterevent', component: AjouterEventComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
