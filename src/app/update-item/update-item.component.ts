import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Commentaire } from 'src/models/commentaire.model';
import { ItemService } from 'src/services/item.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {
  itemId: number | undefined;
  item: any = {}; // Initialiser un objet vide pour éviter les erreurs
  commentaires: Commentaire[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap | null) => {
      if (params) { // Vérifier si params est non null
        const itemId = params.get('id');
        if (itemId) { // Vérifier si itemId est non null
          this.itemId = +itemId;
          this.getItemDetails(this.itemId);
        } else {
          // Gérer le cas où 'id' est absent dans les paramètres
        }
      } else {
        // Gérer le cas où params est null
      }
    });
  }
  
  

  getItemDetails(itemId: number): void {
    this.itemService.getItemById(itemId)
      .subscribe((item: any) => {
        this.item = item;
      });
  }

  updateItem(): void {
    if (this.itemId !== undefined) {
      this.itemService.updateItem(this.itemId, this.item)
        .subscribe(() => {
          // Rediriger vers la page de détails de l'élément mis à jour
          this.router.navigate(['/list-item']);
        });
    } else {
      console.error('itemId is undefined');
      // Gérer le cas où itemId est undefined
    }
  }
}
