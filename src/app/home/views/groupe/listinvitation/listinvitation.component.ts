import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listinvitation',
  templateUrl: './listinvitation.component.html',
  styleUrls: ['./listinvitation.component.css']
})
export class ListinvitationComponent {
  constructor(private router: Router, private http: HttpClient) {}
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  ngOnInit(): void {
    this.userconnect;
    this.getinvitation()
  }
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }
  invitations: any[] = [];

      logout(){
        localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
        localStorage.removeItem(localStorage.getItem('Token')!);
        this.router.navigateByUrl('/login');
        
      }
      nombreinvi : number = 0;
      getinvitation(){
        const url = 'http://localhost:8083/Invitation/listInvitationByUserId/'+this.userconnect.id;
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        this.http.get(url, { headers }).subscribe(
          (response: any) => {
            this.invitations=response
            console.log(this.invitations)
            console.log(this.invitations.length)
            this.nombreinvi = this.invitations.length
            })
      }
      Accepter(inviId : number) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        const addURL = 'http://localhost:8083/Groupe/AssignUserTOGroupe/'+ inviId ;
        this.http.post(addURL, null,{ headers }).subscribe((results) =>{
          this.ngOnInit()
        })
    }
    Refuser(idinvi: number) {
      const token = localStorage.getItem('Token');
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const deleteURL = 'http://localhost:8083/Invitation/deleteInvitation/' + idinvi;
      this.http.delete(deleteURL,{ headers }).subscribe((results) =>{
        this.router.navigateByUrl('/groupes');
        this.ngOnInit();
       
        
      })
    }
}
