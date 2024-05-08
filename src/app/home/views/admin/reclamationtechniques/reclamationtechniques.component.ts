import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reclamationtechniques',
  templateUrl: './reclamationtechniques.component.html',
  styleUrls: ['./reclamationtechniques.component.css']
})
export class ReclamationtechniquesComponent implements OnInit {
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
       this.reclamations = response.filter((rec: { typeReclamtion: string; })  => rec.typeReclamtion !== "Educative" );
       console.log(this.reclamations)
        })
      }

}
