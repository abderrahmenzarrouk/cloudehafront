import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/home/services/itemservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listitems',
  templateUrl: './listitems.component.html',
  styleUrls: ['./listitems.component.css']
})
export class ListitemsComponent {
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  doc : string = "DOCUMENTATION"
  mesitems:any[]=[];
  constructor(private router: Router, private http: HttpClient, private itemService : ItemService ){}
  ngOnInit(): void {
    this.userconnect;
    this.getinvitation()
    this.getItems()
    this.getgroupe()
    this.mesitems = this.userconnect.item;
    console.log(this.userconnect)
    console.log("list mes achats " , this.mesitems)
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
}
