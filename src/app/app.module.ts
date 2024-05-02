import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ItemListComponent } from './item-list/item-list.component';
import { AjouterItemComponent } from './ajouter-item/ajouter-item.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { ListfrontComponent } from './listfront/listfront.component';
<<<<<<< HEAD
=======
import { ItemDetailsComponent } from './item-details/item-details.component';
import { UpdateItemComponent } from './update-item/update-item.component';
>>>>>>> master

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    AjouterItemComponent,
<<<<<<< HEAD
    ListfrontComponent
=======
    ListfrontComponent,
    ItemDetailsComponent,
    UpdateItemComponent
>>>>>>> master
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
