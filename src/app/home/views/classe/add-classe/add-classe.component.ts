import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-classe',
  templateUrl: './add-classe.component.html',
  styleUrls: ['./add-classe.component.css']
})
export class AddClasseComponent {
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
   

    const url = 'http://localhost:8083/PI/classes/add-classe';
    this.http.post(url, formData).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Ajout réussie',
          text: 'Classe Ajouter avec Succes',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          console.log(response)
          this.router.navigate(['/list-classes']);
          
        });
      },
      (error: any) => {
        console.error(error);
        // Handle error response here
      }
    );
  }


}
