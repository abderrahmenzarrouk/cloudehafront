import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reclamationform',
  templateUrl: './reclamationform.component.html',
  styleUrls: ['./reclamationform.component.css']
})
export class ReclamationformComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  ngOnInit(): void {
    this.userconnect;
  }
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }
  type?: string;
  userEmail?: string;
  reclamer(reclamationForm: NgForm) {
    const requestData = {
      user: { id: parseInt(this.userconnect.id)},
      description: reclamationForm.value.description,
      typeReclamtion: reclamationForm.value.type,
      tuteurchoisit: reclamationForm.value.email
    };
  
    console.log(requestData.user)
    const url = 'http://localhost:8083/api/v1/reclamations/add-reclamation';
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  
    this.http.post(url, requestData, { headers }).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Réclamation envoyée avec succès',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
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
