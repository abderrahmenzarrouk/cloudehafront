import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events/events.component';
import { AjouterEventComponent } from './ajouter-event/ajouter-event.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EventChartsComponent } from './event-charts/event-charts.component';



@NgModule({
  declarations: [EventsComponent,AjouterEventComponent, EventChartsComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class EventsModule { }
