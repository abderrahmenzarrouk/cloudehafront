import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router:Router) { }
    ngOnInit() {
    }
    Value: string = "1";
    
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
    
        const url = 'http://localhost:8083/api/v1/auth/registration';
        this.http.post(url, formData, { responseType: 'text' }).subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Inscription réussie',
              text: 'veuillez confirmer votre email',
              showConfirmButton: false,
              timer: 2500
            }).then(() => {
              this.router.navigate(['/verifiermail']);
              
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
