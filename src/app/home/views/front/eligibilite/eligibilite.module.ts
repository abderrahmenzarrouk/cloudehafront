import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EligibiliteRoutingModule } from './eligibilite-routing.module';
import { ListEligibilitiesComponent } from './list-eligibilities/list-eligibilities.component';
import { AddEligComponent } from './add-elig/add-elig.component';


@NgModule({
  declarations: [
    ListEligibilitiesComponent,
    AddEligComponent
  ],
  imports: [
    CommonModule,
    EligibiliteRoutingModule
  ]
})
export class EligibiliteModule { }
