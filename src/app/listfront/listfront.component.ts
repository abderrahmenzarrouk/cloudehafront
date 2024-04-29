import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/models/item.model';
import { ItemService } from 'src/services/item.service';

@Component({
  selector: 'app-listfront',
  templateUrl: './listfront.component.html',
  styleUrls: ['./listfront.component.css']
})
export class ListfrontComponent implements OnInit {
  items: Item[] = [];
  commentaires: any[] | undefined;

  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit(): void {
    this.getItems();

  }
  getItems(): void {
    this.itemService.getAllItems().subscribe({
        next: (items: Item[]) => {
            this.items = items;
            this.decodeBase64Images();
            console.log('Liste des items :', this.items);

            // Charger les commentaires pour chaque item
            this.items.forEach(item => {
                this.loadCommentaires(item.id); // Appeler loadCommentaires pour chaque item
            });
        },
        error: (error) => {
            console.error('Erreur lors de la récupération des items :', error);
        }
    });
}
  
  decodeBase64Images(): void {
    this.items.forEach((item) => {
      const imageUrl = 'data:image/jpeg;base64,' + item.image; // Assurez-vous que le type MIME correspond à votre image
      item.imageUrl = imageUrl;
    });
  }
  loadCommentaires(itemId: number): void {
    this.itemService.getAllCommentairesByItemId(itemId)
        .subscribe((data: any) => {
            const item = this.items.find(item => item.id === itemId);
            if (item) {
                item.commentaires = data;
            }
            console.log('Commentaires récupérés pour l\'item', itemId, ':', data);
        }, (error) => {
            console.error('Une erreur s\'est produite lors du chargement des commentaires pour l\'item', itemId, ':', error);
        });
}



  

  
  

}