
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackComponent } from './back.component';

const routes: Routes = [
  {
    path: "",
    component: BackComponent,
    children: [
      {
        path: "events",
        loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackRoutingModule { }
