import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/models/item.model';
import { ItemService } from 'src/services/item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  item: Item = new Item;


  constructor(private route: ActivatedRoute,
    private itemService: ItemService) { }

    ngOnInit(): void {
      const itemId = this.route.snapshot.params['id'];
      this.getItemDetails(itemId);
    }
  
    getItemDetails(itemId: number): void {
      this.itemService.getItemById(itemId).subscribe(
        (item) => {
          this.item = item;
          this.decodeBase64Images();
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails de l\'item :', error);
        }
      );
    }
    decodeBase64Images(): void {
      if (this.item) {
        const imageUrl = 'data:image/jpeg;base64,' + this.item.image; // Assurez-vous que le type MIME correspond à votre image
        this.item.imageUrl = imageUrl;
      }
    }
    
    
      
    
    
  }