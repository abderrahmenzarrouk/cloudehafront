import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addclasse',
  templateUrl: './addclasse.component.html',
  styleUrls: ['./addclasse.component.css']
})
export class AddclasseComponent {
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  constructor (private http: HttpClient,private router: Router){

  }
  Ajouter(ajouterClasseForm: NgForm){
    const fileInput: HTMLInputElement | any = document.querySelector('#fileInput');
    const file: File  = fileInput.files[0] ;
    let formData = new FormData();
    formData.append('image', file);
    formData.append('etage', ajouterClasseForm.value.etage);
    formData.append('num', ajouterClasseForm.value.num);
    formData.append('bloc', ajouterClasseForm.value.bloc);
   
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const url = 'http://localhost:8083/classes/add-classe';
    this.http.post(url, formData,{headers}).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Ajout réussie',
          text: 'Classe Ajouter avec Succes',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          console.log(response)
          this.router.navigate(['/ajouterclasse']);
          
        });
      },
      (error: any) => {
        console.error(error);
        // Handle error response here
      }
    );
  }
  ngOnInit(): void {
    this.userconnect;
  }
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }

  logout(){
    localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
    localStorage.removeItem(localStorage.getItem('Token')!);
    this.router.navigateByUrl('/login');
    
  }

}
