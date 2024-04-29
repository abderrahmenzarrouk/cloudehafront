import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterItemComponent } from './ajouter-item/ajouter-item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ListfrontComponent } from './listfront/listfront.component';

const routes: Routes = [
  { path: 'ajouter-item', component: AjouterItemComponent },
  { path: 'list-item', component: ItemListComponent },
  { path: 'list', component: ListfrontComponent },

  { path: '', redirectTo: '/list-item', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
