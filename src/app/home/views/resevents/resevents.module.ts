import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReseventsRoutingModule } from './resevents-routing.module';
import { ReseventsComponent } from './resevents/resevents.component';
import { EventsComponent } from '../back/events/events/events.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReservationService } from '../../services/resevent.service';

@NgModule({
  declarations: [ReseventsComponent
  ],
  imports: [
    CommonModule,
    ReseventsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ReservationService 
  ]
})
export class ReseventsModule { }
