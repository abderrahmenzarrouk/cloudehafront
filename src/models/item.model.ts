import { Commentaire } from "./commentaire.model";

export class Item {
  forEach(arg0: (item: any) => void) {
    throw new Error('Method not implemented.');
  }
    id!: number;
    nom!: string;
    description!: string;
    nombreDePoints!: number;
    image!: string;
    typeItem!: string;
    mode!: string;
  imageUrl?: string;
  commentaires: Commentaire[] = []; 
  showDetails: boolean | undefined;
  rating: number | undefined; // Ajoutez cette propriété


  

}