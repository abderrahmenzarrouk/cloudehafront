import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouterpostgroupe',
  templateUrl: './ajouterpostgroupe.component.html',
  styleUrls: ['./ajouterpostgroupe.component.css']
})
export class AjouterpostgroupeComponent {
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
            this.listdesposts()
            })
      }

      posts: any[] = [];
      listdesposts(){
        const url = 'http://localhost:8083/Post/retrieveAllPosts/'+this.idgroupe;
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        this.http.get(url, { headers }).subscribe(
          (response: any) => {
            this.posts = response
            console.log(this.posts)
            
            })

      }
      hiddenpost : boolean = false;
      shownpost: number[] = [];
      voirpost(idpost:number){
        const index = this.shownpost.indexOf(idpost);
        if (index !== -1) {
          this.shownpost.splice(index, 1); 
        } else {
          this.shownpost.push(idpost); 
        }
        
      }

      postForm = new FormGroup({
        post: new FormControl('', [Validators.required]),
      });
      envoyerpost(idpost : number){
        const payload: any = {
          post: this.postForm.value.post || '',
        };
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        const url = "http://localhost:8083/ResponsePost/addResponsePost/"+this.postForm.value.post+"/"+idpost+"/"+this.userconnect.id;
        this.http.post(url, null,{ headers }).subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'commentaire envoyer',
              text: 'Votre commentaire a été ajouter avec succée',
              showConfirmButton: false,
              timer: 2500
            }).then(() => {
              window.location.reload();
              
            });
          },
          (error: any) => {
            console.error(error);
            // Handle error response here
          }
        );

      }
      commentaires: any[] = [];
      showncpmmentaire: number[] = [];
      hiddencommentaire : boolean = false;
      getcommentaires(idpost : number){
        const index = this.showncpmmentaire.indexOf(idpost);
        if (index !== -1) {
          this.showncpmmentaire.splice(index, 1); 
        } else {
          this.showncpmmentaire.push(idpost); 
        }
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        const url = "http://localhost:8083/ResponsePost/listResponsePost/"+idpost;
        this.http.get(url,{ headers }).subscribe(
          (response: any) => {
            this.commentaires = response;
          },
          (error: any) => {
            console.error(error);
            // Handle error response here
          }
        );

      }
}
