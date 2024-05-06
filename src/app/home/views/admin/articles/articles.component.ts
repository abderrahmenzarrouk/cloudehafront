import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/home/services/itemservice.service';
import { UserService } from 'src/app/home/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {
  addItemForm: FormGroup;
  documentationFile:string | ArrayBuffer | null | undefined;
  imageUrl: string | ArrayBuffer | null | undefined;
  constructor(private router: Router, private userService : UserService,private formBuilder: FormBuilder, private itemService : ItemService ){
    this.addItemForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: '',
      nombreDePoints: '',
      image: '',
      typeItem: 'FORMATION',
      mode: '',
      documentation:''
    });
  }
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);

  tuteurs: any[] = [];
  ngOnInit(): void {
    this.userconnect;
    this.hiddenform = false
    this.getItems()
   
  }
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }
  logout(){
    localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
    localStorage.removeItem(localStorage.getItem('Token')!);
    this.router.navigateByUrl('/login');
    
  }
  hiddenform : boolean =false;
  voirform(){
    if(this.hiddenform === false){
      this.hiddenform = true
    }else{this.hiddenform=false}
  }
  onDocumentationFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Stockez le fichier dans le modèle addItemForm
      this.addItemForm.patchValue({
        documentation: file
      });
  
      // Mettez à jour la validation
      this.addItemForm.get('documentation')?.updateValueAndValidity();
  
      // Utilisez FileReader pour obtenir l'URL de l'image
      const reader = new FileReader();
      reader.onload = () => {
        // Convertir en chaîne pour l'URL de l'image
        this.documentationFile = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  

  onSubmit(): void {
    const itemData = this.addItemForm.value;

    this.itemService.addItem(itemData).subscribe(
      (response : any) => {
        console.log(response)

       
      },
      (error: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Ajout réussit',
          text: 'Votre Formation a été ajouter avec succée',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          this.ngOnInit()
          
        });
      }
      
      
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
  items: any[] = [];
  getItems(): void {
    this.itemService.getAllItems().subscribe({
      next: (items: any[]) => {
        this.items = items;

        console.log('Liste des items :', this.items);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des items :', error);
      }
    });
  }

  deleteItem(itemId: number): void {
    this.itemService.deleteItem(itemId).subscribe(
      (response : any) => {
        console.log(response)
       
      },
      (error: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Article Supprimer',
          text: 'L article a été supprimé avec succée',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          this.ngOnInit()
          
        });
        
      }
      
    );
  }
  updateitem(id:any){
    this.router.navigate(['/update-articles',id]);

  }

  

}
