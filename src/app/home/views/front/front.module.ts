import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { FrontComponent } from './front/front.component';
import { EventsModule } from './events/events.module';
import { ReseventsComponent } from '../resevents/resevents/resevents.component';
import { ReseventsModule } from './resevents/resevents.module';


@NgModule({
  declarations: [
    FrontComponent
  ],
  imports: [
    CommonModule,
    FrontRoutingModule
  ]
})
export class FrontModule { }
