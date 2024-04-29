import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  constructor(private router: Router , private http: HttpClient){}
  forgetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  forgetmdp(){
    const payload: any = {
      email: this.forgetForm.value.email || '',
    };
    const url = 'http://localhost:8083/api/v1/auth/forgot-password';
    this.http.post(url, payload).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Mot De passe Changer avec success',
          text: 'N oubliez pas de le changer',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          this.router.navigate(['/login']);
          
        });
      },
      (error: any) => {
        console.error(error);
        // Handle error response here
      }
    );

  }
}
