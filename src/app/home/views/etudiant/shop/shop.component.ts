import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/home/services/itemservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  doc : string = "DOCUMENTATION"
  constructor(private router: Router, private http: HttpClient, private itemService : ItemService ){}
  ngOnInit(): void {
    this.userconnect;
    this.getinvitation()
    this.getItems()
    this.getgroupe()
  }
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }
  getUserData() {
    this.userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  }
  logout(){
    localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
    localStorage.removeItem(localStorage.getItem('Token')!);
    this.router.navigateByUrl('/login');
    
  }
  nombreinvi : number = 0;
  invitations: any[] = [];
  getinvitation(){
    const url = 'http://localhost:8083/Invitation/listInvitationByUserId/'+this.userconnect.id;
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.get(url, { headers }).subscribe(
      (response: any) => {
        this.invitations=response
        this.nombreinvi = this.invitations.length
        })
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
  nbrpoint : number =0;
  getgroupe(){
    const url = 'http://localhost:8083/Groupe/ListGroupePerUser/'+this.userconnect.id;
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.get(url, { headers }).subscribe(
      (response: any) => {
        this.nbrpoint = response[0].total_Score
        console.log(this.nbrpoint)

        })
  }

  acheter(prix : number, id : number){
    if(prix > this.nbrpoint){
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Votre Solde est insuffisant.',
        showConfirmButton: false,
        timer: 2500
      })
    }else{
      const token = localStorage.getItem('Token');
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const url = "http://localhost:8083/api/v1/user/acheter/"+this.userconnect.id+"/"+prix+"/"+id;
      this.http.get(url,{ headers }).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Achat effectuée',
            text: 'Votre achat a été effectué avec succeé',
            showConfirmButton: false,
            timer: 2500
          }).then(() => {
            this.ngOnInit()
            
          });
        },
        (error: any) => {
          console.error(error);
          // Handle error response here
        }
      );
    }

  }
  hidecommentaire : boolean = false;
  commentaire: any[] = [];
  iditemcomm ?: number;
  voirecommentaire(id : number){
    if(this.hidecommentaire == false){
      this.hidecommentaire = true
    }else this.hidecommentaire = false
    this.iditemcomm = id;
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const url = "http://localhost:8083/items/"+id+"/getcommentaires"
    this.http.get(url,{ headers }).subscribe(
      (response: any) => {
        this.commentaire = response
        console.log(this.commentaire)
      },
      (error: any) => {
        console.error(error);
        // Handle error response here
      }
    );

  }
  commentaireForm = new FormGroup({
    commentaire: new FormControl('', [Validators.required]),
  });

  ajoutercommentaire(){
    const payload: any = {
      contenu: this.commentaireForm.value.commentaire || '',
    };
    const url = 'http://localhost:8083/items/'+this.userconnect.nom+'/'+this.iditemcomm+'/commentaires';
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.post(url, payload,{headers}).subscribe(
      (response: any) => {

      },
      (error: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Commentaire ajouter',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          window.location.reload();
          
        });
      }
    );
  }


  updateNote(itemId: number, newNote: number): void {
    this.itemService.updateItemNote(itemId, newNote)
      .subscribe(
        (response) => {
          console.log('Note updated successfully:', response);
          window.location.reload();
        },
        (error) => {
          console.error('Error updating note:', error);
          // Gérer l'erreur de manière appropriée
        }
      );
  }
  generateStars(note: number): any[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= note) {
        stars.push('full');
      } else {
        stars.push('empty');
      }
    }
    return stars;
  }
  
  
  setRating(itemId: number, star: number): void {
    const item = this.items.find(item => item.id === itemId);
    if (item) {
      item.note = star;
      this.updateNote(itemId, star);
    }
  }



}
