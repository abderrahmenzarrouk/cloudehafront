import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontComponent } from './front/front.component';

const routes: Routes = [{path :'',
component:FrontComponent,
children: [
{

  path: "reservations",
  loadChildren: () => import('../front/resevents/resevents.module').then(m => m.ReseventsModule),

},
{

    path: "events",
    loadChildren: () => import('./events/events.module').then(m => m.EventsModule),


}
]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
