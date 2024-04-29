import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/models/item.model';
import { ItemService } from 'src/services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService, private router: Router) { }

  redirectToNewItemPage() {
    this.router.navigate(['/ajouter-item']);
  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getAllItems().subscribe({
      next: (items: Item[]) => {
        this.items = items;
        this.decodeBase64Images(); // Appeler la méthode pour décoder les images base64
        console.log('Liste des items :', this.items);
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
  


  deleteItem(itemId: number): void {
    this.itemService.deleteItem(itemId).subscribe({
      next: () => {
        this.items = this.items.filter(item => item.id !== itemId);
        this.refreshItems(); // Appeler la méthode pour rafraîchir la liste des items après la suppression
      },
      error: (error) => {
        console.error('Une erreur s\'est produite lors de la suppression de l\'élément : ', error);
      }
    });
  }

  refreshItems(): void {
    this.itemService.getAllItems().subscribe({
      next: (items: Item[]) => {
        this.items = items;
        console.log('Liste des items mise à jour :', this.items);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des items après suppression :', error);
      }
    });
  }
}
