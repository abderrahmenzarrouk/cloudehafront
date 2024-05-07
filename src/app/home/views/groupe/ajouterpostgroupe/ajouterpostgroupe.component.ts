import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


export class Post {
  constructor(
    public idPost: string,
    public contenu: string,    
  ) {}
}

export class ResponsePost {
  constructor(
    public idResponse: string,
       public contenu: string
  
  ) {}
}

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
// Declare variables
hiddenCommentForm: number | null = null;
hiddenEditForm: number | null = null;
hiddenEditFormComment: number | null = null;

// Event handlers
voirpost(postId: number) {
  this.hiddenCommentForm = this.hiddenCommentForm === postId ? null : postId;
}

voirpost2(postId: number) {
  this.hiddenEditForm = this.hiddenEditForm === postId ? null : postId;
}

voirpost3(idResponse: number) {
  this.hiddenEditFormComment = this.hiddenEditForm === idResponse ? null : idResponse;
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
            console.log(this.commentaires[0].idResponse)
          },
          (error: any) => {
            console.error(error);
            // Handle error response here
          }
        );

      }


      EditForm = new FormGroup({
        idPost:new FormControl('', Validators.required),
        contenu: new FormControl('', Validators.required),
        idResponse:new FormControl('', Validators.required),
       
      });

      ModifierPost(post: Post)
      {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        this.EditForm.patchValue({
          idPost: post.idPost,
          contenu: post.contenu
        });
      }

      EditPost(){
        const payload: any = {

          idPost: this.EditForm.value.idPost|| '',
          contenu: this.EditForm.value.contenu|| '',
          
        };
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        const url = 'http://localhost:8083/Post/updatePost';
         this.http.put(url,this.EditForm.value,{ headers }).subscribe(
      (response: any) => {
        console.log(this.EditForm.value)
        Swal.fire({
          icon: 'success',
          title: 'Post Mise à Jour Avec Succées',
          text: 'Post Vous à été Mise à Jour avec Succées ',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
       //   this.router.navigate(['/list-groups']);
        });
      },
      (error: any) => {
        console.error(error);
        // Handle error response here
      }
    );
      }


      EditPost2(){
        const payload: any = {
          idResponse: this.EditForm.value.idResponse|| '',
          contenu: this.EditForm.value.contenu|| '',
          
        };
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        const url = 'http://localhost:8083/ResponsePost/updateResponsePost';
         this.http.put(url,this.EditForm.value,{ headers }).subscribe(
      (response: any) => {
        console.log(this.EditForm.value)
        Swal.fire({
          icon: 'success',
          title: 'Commentaire Mise à Jour Avec Succées',
          text: 'Commentaire Vous à été Mise à Jour avec Succées ',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
       //   this.router.navigate(['/list-groups']);
        });
      },
      (error: any) => {
        console.error(error);
        // Handle error response here
      }
    );
      }



     
      ModifierResponsePost(commentaire: ResponsePost)
      {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        this.EditForm.patchValue({
          idResponse: commentaire.idResponse,
          contenu: commentaire.contenu
        });
        
      }


      DeleteCommentaire(id: number){
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        const url = 'http://localhost:8083/ResponsePost/deleteResponse/'+ id;
         this.http.delete(url,{ headers }).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Commentaire Supprimer Avec Succées',
          text: 'Commentaire Vous à été Supprimer avec Succées ',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          this.ngOnInit
        });
      },
      (error: any) => {
        console.error(error);
        // Handle error response here
      }
    );
      }



      Deletepost(id: number){
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        const url = 'http://localhost:8083/Post/deletePost/'+ id;
         this.http.delete(url,{ headers }).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Post Supprimer Avec Succées',
          text: 'Post à été Supprimer avec Succées ',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          this.ngOnInit
        });
      },
      (error: any) => {
        console.error(error);
        // Handle error response here
      }
    );
      }
}
