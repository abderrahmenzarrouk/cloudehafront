import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listreclamations',
  templateUrl: './listreclamations.component.html',
  styleUrls: ['./listreclamations.component.css']
})
export class ListreclamationsComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  ngOnInit(): void {
    this.userconnect;
    this.getreclamtions()
    this.getinvitation()
  }
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }
  reclamations: any[] = [];
  getreclamtions(){
    const requestData = {
      userid:  parseInt(this.userconnect.id),
      
    };
    const url = 'http://localhost:8083/api/v1/reclamations/get-by-user';
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.post(url,requestData, { headers }).subscribe(
      (response: any) => {
       this.reclamations = response;
       console.log(this.reclamations)
        })
      }
      logout(){
        localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
        localStorage.removeItem(localStorage.getItem('Token')!);
        this.router.navigateByUrl('/login');
        
      }
      nombreinvi : number = 0;
      invitations: any[] = [];
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
}


