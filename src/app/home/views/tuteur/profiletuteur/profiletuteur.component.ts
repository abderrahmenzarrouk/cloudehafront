import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profiletuteur',
  templateUrl: './profiletuteur.component.html',
  styleUrls: ['./profiletuteur.component.css']
})
export class ProfiletuteurComponent implements OnInit{
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
    constructor(private router: Router, private http: HttpClient){}
    ngOnInit(): void {
      this.userconnect;
    }
    decodeBase64Image(base64Data: string): string {
      return 'data:image/png;base64,' + base64Data;
    }
    getUserData() {
      this.userconnect = JSON.parse(localStorage.getItem("userconnect")!);
    }
    register(registerForm: NgForm ) {
      if (registerForm.valid) {
        const fileInput: HTMLInputElement | any = document.querySelector('#fileInput');
        const file: File  = fileInput.files[0] ;
    
        let formData = new FormData();
        formData.append('file', file);
        const emailValue = registerForm.value.email;
        const emailToSend = emailValue ? emailValue : this.userconnect.email;
        formData.append('email', emailToSend);
        const nomValue = registerForm.value.nom;
        const nomToSend = nomValue ? nomValue : this.userconnect.nom; 
        formData.append('nom', nomToSend);
        const prenomValue = registerForm.value.prenom;
        const prenomToSend = prenomValue ? prenomValue : this.userconnect.prenom;
        formData.append('prenom', prenomToSend);
        const ageValue = registerForm.value.age;
        const ageToSend = ageValue ? ageValue : this.userconnect.age; 
    
        formData.append('age', ageToSend);
        const telValue = registerForm.value.tel;
        const telToSend = telValue ? telValue : this.userconnect.tel;
        formData.append('tel', telToSend);
        formData.append('id', this.userconnect.id);
        
    
        const url = 'http://localhost:8083/api/v1/user/updateuser';
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        this.http.post(url, formData, { headers: headers  }).subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Modification',
              text: 'Modification éffectué avec succés',
              showConfirmButton: false,
              timer: 2500
            }).then(() => {
              console.log(response)
              localStorage.setItem('userconnect', JSON.stringify(response));
              this.getUserData();
              this.router.navigateByUrl('/profile-etudiant');
              
              
            });
          },
          (error: any) => {
            console.error(error);
            // Handle error response here
          }
        );

        
        
      }
    }
    logout(){
      localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
      localStorage.removeItem(localStorage.getItem('Token')!);
      this.router.navigateByUrl('/login');
      
    }
}
