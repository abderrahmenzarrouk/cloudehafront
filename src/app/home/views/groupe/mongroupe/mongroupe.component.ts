import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mongroupe',
  templateUrl: './mongroupe.component.html',
  styleUrls: ['./mongroupe.component.css']
})
export class MongroupeComponent {
  constructor(private router: Router, private http: HttpClient) {}
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  ngOnInit(): void {
    this.userconnect;
    this.getinvitation()
    this.listdemongroupe()
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
            this.nombreinvi = this.invitations.length
            })
      }
      mongroupe: any[] = [];
      idgroupe ?: number;
      listdemongroupe(){
        const url = 'http://localhost:8083/Groupe/getotherMembers/'+this.userconnect.id;
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        this.http.get(url, { headers }).subscribe(
          (response: any) => {
            this.mongroupe = response
            this.idgroupe = this.mongroupe[0].groupeSet[0].idGroupe
            console.log(this.mongroupe)
            console.log("id du groupe"+this.idgroupe)
            })
      }
      hiddenpost : boolean = false;
      voirpost(){
        if(this.hiddenpost == false){
          this.hiddenpost=true
        }else{this.hiddenpost=false}
        
      }

      postForm = new FormGroup({
        post: new FormControl('', [Validators.required]),
      });
      envoyerpost(){
        const payload: any = {
          post: this.postForm.value.post || '',
        };
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        const url = 'http://localhost:8083/Post/addPost/'+this.postForm.value.post+'/'+this.idgroupe+'/'+this.userconnect.id;
        this.http.post(url, null,{ headers }).subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Post envoyer',
              text: 'Votre post a été envoyer au autre membre du groupe',
              showConfirmButton: false,
              timer: 2500
            }).then(() => {
              this.router.navigate(['/groupepost']);
              
            });
          },
          (error: any) => {
            console.error(error);
            // Handle error response here
          }
        );

      }

}
