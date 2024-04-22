import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reclamationtuteur',
  templateUrl: './reclamationtuteur.component.html',
  styleUrls: ['./reclamationtuteur.component.css']
})
export class ReclamationtuteurComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  ngOnInit(): void {
    this.userconnect;
    this.getreclamtions()
  }
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }
  reclamations: any[] = [];
  getreclamtions(){
    const url = 'http://localhost:8083/api/v1/reclamations/all';
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.get(url, { headers }).subscribe(
      (response: any) => {
       this.reclamations = response.filter((rec: { tuteurchoisit: string; })  => rec.tuteurchoisit == this.userconnect.email );
       console.log(this.reclamations)
        })
      }
      enable(idr : any){
        const requestData = {
          id:  idr,
          
        };
        const url = 'http://localhost:8083/api/v1/reclamations/reclamation-traitee';
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        this.http.post(url,requestData, { headers }).subscribe(
          (response: any) => {
            console.log(response)
            window.location.reload();
            
            })
      }

}
