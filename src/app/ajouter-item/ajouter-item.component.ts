import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'src/services/item.service';

@Component({
  selector: 'app-ajouter-item',
  templateUrl: './ajouter-item.component.html',
  styleUrls: ['./ajouter-item.component.css']
})
export class AjouterItemComponent implements OnInit {
  addItemForm: FormGroup;
  imageUrl: string | ArrayBuffer | null | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private router: Router
  ) {
    this.addItemForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: '',
      nombreDePoints: '',
      image: '',
      typeItem: 'FORMATION',
      mode: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const itemData = this.addItemForm.value;

    this.itemService.addItem(itemData).subscribe(
      (response) => {
        console.log('Item ajouté avec succès:', response);
        this.router.navigate(['/list-item']);
      },
      
      
    );
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Stockez le fichier dans le modèle addItemForm
      this.addItemForm.patchValue({
        image: file
      });
  
      // Mettez à jour la validation
      this.addItemForm.get('image')?.updateValueAndValidity();
  
      // Utilisez FileReader pour obtenir l'URL de l'image
      const reader = new FileReader();
      reader.onload = () => {
        // Convertir en chaîne pour l'URL de l'image
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}  