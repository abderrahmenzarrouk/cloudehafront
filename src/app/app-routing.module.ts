import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterItemComponent } from './ajouter-item/ajouter-item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ListfrontComponent } from './listfront/listfront.component';
<<<<<<< HEAD
=======
import { ItemDetailsComponent } from './item-details/item-details.component';
import { UpdateItemComponent } from './update-item/update-item.component';
>>>>>>> master

const routes: Routes = [
  { path: 'ajouter-item', component: AjouterItemComponent },
  { path: 'list-item', component: ItemListComponent },
  { path: 'list', component: ListfrontComponent },
<<<<<<< HEAD
=======
  { path: 'item-details/:id', component: ItemDetailsComponent },
  { path: 'update-item/:id', component: UpdateItemComponent },


>>>>>>> master

  { path: '', redirectTo: '/list-item', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
