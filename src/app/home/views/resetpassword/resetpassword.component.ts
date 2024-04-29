import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
    constructor(private router: Router, private http: HttpClient){}
    ngOnInit(): void {
      this.userconnect;
      this.getUserData()
    }
    decodeBase64Image(base64Data: string): string {
      return 'data:image/png;base64,' + base64Data;
    }
    getUserData() {
      this.userconnect = JSON.parse(localStorage.getItem("userconnect")!);
    }
    resetForm = new FormGroup({
      oldmdp: new FormControl('', [Validators.required]),
      newmdp: new FormControl('', [Validators.required]),
    });

    reset(){
      const payload: any = {
        email: this.userconnect.email || '',
        oldmdp: this.resetForm.value.oldmdp || '',
        newmdp: this.resetForm.value.newmdp || '',
      };


      const url = 'http://localhost:8083/api/v1/user/changer-mdp';
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        this.http.post(url, payload, { headers: headers  }).subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Modification',
              text: 'Modification éffectué avec succés',
              showConfirmButton: false,
              timer: 2500
            }).then(() => {
              localStorage.setItem('userconnect', JSON.stringify(response));
              if (response.userRole.role === "Etudiant"){
                this.router.navigateByUrl('/profile-etudiant');
              }
              if (response.userRole.role === "Tuteur"){
                this.router.navigateByUrl('/profile-tuteur');
              }
              
              
              
            });
          },
          (error: any) => {
            console.error(error);
            // Handle error response here
          }
        );
      

    }

}
