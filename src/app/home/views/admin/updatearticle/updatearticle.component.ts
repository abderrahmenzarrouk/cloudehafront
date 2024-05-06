import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/home/services/itemservice.service';
import { UserService } from 'src/app/home/services/user.service';
import { ParamMap } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatearticle',
  templateUrl: './updatearticle.component.html',
  styleUrls: ['./updatearticle.component.css']
})
export class UpdatearticleComponent {
  addItemForm: FormGroup;
  documentationFile:string | ArrayBuffer | null | undefined;
  imageUrl: string | ArrayBuffer | null | undefined;
  itemId: number | undefined;
  constructor(private router: ActivatedRoute, private userService : UserService,private formBuilder: FormBuilder, private itemService : ItemService , private route : Router){
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
  item : any;
  ngOnInit(): void {
    this.userconnect;
    this.router.paramMap.subscribe((params: ParamMap | null) => {
      console.log("here")
      console.log(params)
      if (params) { // Vérifier si params est non null
        const itemId = params.get('id');
        console.log(itemId)
        if (itemId) { // Vérifier si itemId est non null
          this.itemId = + itemId
          
          this.getItemDetails(this.itemId);
        } else {
          // Gérer le cas où 'id' est absent dans les paramètres
        }
      } else {
        // Gérer le cas où params est null
      }
    });
   
  }
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }
  logout(){
    localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
    localStorage.removeItem(localStorage.getItem('Token')!);
    this.route.navigateByUrl('/login');
    
  }
  getItemDetails(itemId: number): void {
    this.itemService.getItemById(itemId)
      .subscribe((item: any) => {
        this.item = item;
        console.log(item)
      });
  }

  updateItem(): void {
    if (this.itemId !== undefined) {
      this.itemService.updateItem(this.itemId, this.item)
        .subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'mise à jour réussie',
            showConfirmButton: false,
            timer: 2500
          }).then(() => {
            this.route.navigate(['/articles']);
            
          });
        });
    } else {
      console.error('itemId is undefined');
      // Gérer le cas où itemId est undefined
    }
  }

}
