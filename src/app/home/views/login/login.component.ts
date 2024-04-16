import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  constructor(private router: Router , private authenticationService: AuthenticationService){}
  ngOnInit() {
  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  Login(){
    const payload: any = {
      email: this.loginForm.value.email || '',
      mdp: this.loginForm.value.password || ''
    };
    

    this.authenticationService.login(payload).subscribe((res: any) => {
      if (res && res.user && res.user.enabled) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
        
        Toast.fire({
          icon: 'success',
          title: 'Connexion réussie'
        });
        console.log(res);
        localStorage.setItem('userconnect', JSON.stringify(res.user));
        localStorage.setItem('Token', res.token);
        if (res.user.userRole.role === "Etudiant") {
          this.router.navigateByUrl('/profile-etudiant');
        }
        if (res.user.userRole.role === "Admin") {
          this.router.navigateByUrl('/profile-admin');
        }
        
        
      }
     
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'La connexion a échoué. Veuillez vérifier vos informations d identification.',
        showConfirmButton: true
      });
    
    });


  }
}
