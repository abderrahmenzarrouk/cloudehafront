import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { Item } from 'src/models/item.model';
import { ItemService } from 'src/services/item.service';

=======
import { Commentaire } from 'src/models/commentaire.model';
import { Item } from 'src/models/item.model';
import { ItemService } from 'src/services/item.service';


>>>>>>> master
@Component({
  selector: 'app-listfront',
  templateUrl: './listfront.component.html',
  styleUrls: ['./listfront.component.css']
})
export class ListfrontComponent implements OnInit {
  items: Item[] = [];
<<<<<<< HEAD
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
  
=======
  commentaires: Commentaire[] = [];


  constructor(private itemService: ItemService, private router: Router) { }
  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getAllItems().subscribe({
      next: (items: Item[]) => {
        this.items = items;
        this.decodeBase64Images();
        this.items.forEach(item => {
          item.showDetails = false; // Initialiser showDetails à false pour chaque item
        });
        this.loadCommentaires(); // Appeler loadCommentaires pour récupérer les commentaires après avoir récupéré les éléments
  
        // Convertir l'objet en une liste de commentaires
        this.items.forEach(item => {
          item.commentaires = Object.values(item.commentaires);
        });
  
        console.log('Liste des commentaires :', this.items[0].commentaires); // Ajouter le console.log pour vérifier la liste
  
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des items :', error);
      }
    });
  }

>>>>>>> master
  decodeBase64Images(): void {
    this.items.forEach((item) => {
      const imageUrl = 'data:image/jpeg;base64,' + item.image; // Assurez-vous que le type MIME correspond à votre image
      item.imageUrl = imageUrl;
    });
  }
<<<<<<< HEAD
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



  

  
  

=======

  // ...

loadCommentaires(): void {
  this.items.forEach(item => {
    this.itemService.getAllCommentairesByItemId(item.id).subscribe((data: Commentaire[]) => {
      item.commentaires = data;

      // Add the additional code block here
      if (item.commentaires && typeof item.commentaires === 'object') {
        const commentairesArray = Object.values(item.commentaires);
        commentairesArray.forEach((commentaire: Commentaire) => {
          console.log(commentaire);
        });
      }

      console.log('Commentaires récupérés pour l\'item', item.id, ':', data);
    }, (error) => {
      console.error('Une erreur s\'est produite lors du chargement des commentaires pour l\'item', item.id, ':', error);
    });
  });
}

// ...
  navigateToItemDetails(item: Item): void {
    this.router.navigate(['/item-details', item.id]);
  }
>>>>>>> master
}