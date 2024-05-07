import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listgroups',
  templateUrl: './listgroups.component.html',
  styleUrls: ['./listgroups.component.css']
})
export class ListgroupsComponent {
  constructor(private router: Router, private http: HttpClient) {}
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  ngOnInit(): void {
    this.userconnect;
    this.getgroupes()
    this.getinvitation()
  }
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }
  groupes: any[] = [];
  getgroupes(){
    const url = 'http://localhost:8083/Groupe/getAllGroupes';
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.get(url, { headers }).subscribe(
      (response: any) => {
        this.groupes = response
       console.log(this.groupes)
        })
      }
      logout(){
        localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
        localStorage.removeItem(localStorage.getItem('Token')!);
        this.router.navigateByUrl('/login');
        
      }
      envoyerinvitation(idgroupe:number){
        const url = 'http://localhost:8083/Invitation/addInvitation/'+this.userconnect.id+'/'+idgroupe;
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        this.http.post(url,null, { headers }).subscribe(
          (response: any) => {
            
            Swal.fire({
              icon: 'success',
              title: 'Invitation envoyer',
              text: 'Votre invitation pour rejoindre ce groupe a été envoyer avec succeé',
              showConfirmButton: false,
              timer: 2500
            }).then(() => {
              this.ngOnInit()
              
            });
            })
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

      



}

