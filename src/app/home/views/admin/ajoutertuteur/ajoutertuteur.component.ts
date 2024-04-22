import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajoutertuteur',
  templateUrl: './ajoutertuteur.component.html',
  styleUrls: ['./ajoutertuteur.component.css']
})
export class AjoutertuteurComponent implements OnInit {
  constructor(private router: Router,private http: HttpClient ){}
  ngOnInit() {
  }
  Value: string = "2";
  
  register(registerForm: NgForm ) {
    if (registerForm.valid) {
      const fileInput: HTMLInputElement | any = document.querySelector('#fileInput');
      const file: File  = fileInput.files[0] ;
  
      let formData = new FormData();
      formData.append('file', file);
      formData.append('email', registerForm.value.email);
      formData.append('MDP', registerForm.value.mdp);
      formData.append('nom', registerForm.value.nom);
      formData.append('prenom', registerForm.value.prenom);
      formData.append('age', registerForm.value.age);
      formData.append('tel', registerForm.value.telephone);
      formData.append('role', this.Value.toString());
  
      const url = 'http://localhost:8083/api/v1/auth/registration/tuteur';
      this.http.post(url, formData, { responseType: 'text' }).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Inscription réussie',
            text: 'veuillez confirmer votre email',
            showConfirmButton: false,
            timer: 2500
          }).then(() => {
            this.router.navigate(['/list-tuteur']);
            
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
