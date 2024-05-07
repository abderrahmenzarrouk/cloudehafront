import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css',]
})
export class FrontComponent {
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  constructor(private router: Router, private http: HttpClient){}
  logout(){
    localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
    localStorage.removeItem(localStorage.getItem('Token')!);
    this.router.navigateByUrl('/login');
    
  }
  ngOnInit(): void {
    this.userconnect;
    this.getinvitation()
  }
  
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
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
