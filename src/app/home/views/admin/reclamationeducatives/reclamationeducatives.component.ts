import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reclamationeducatives',
  templateUrl: './reclamationeducatives.component.html',
  styleUrls: ['./reclamationeducatives.component.css']
})
export class ReclamationeducativesComponent {
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
       this.reclamations = response.filter((rec: { typeReclamtion: string; })  => rec.typeReclamtion !== "Technique" );
       console.log(this.reclamations)
        })
      }
      logout(){
        localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
        localStorage.removeItem(localStorage.getItem('Token')!);
        this.router.navigateByUrl('/login');
        
      }

}
