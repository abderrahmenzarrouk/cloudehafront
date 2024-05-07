import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEligibilitiesComponent } from './list-eligibilities/list-eligibilities.component';

const routes: Routes = [{path:"eligibility",component:ListEligibilitiesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EligibiliteRoutingModule { }
