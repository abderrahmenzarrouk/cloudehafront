import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rendezvousgroupe',
  templateUrl: './rendezvousgroupe.component.html',
  styleUrls: ['./rendezvousgroupe.component.css']
})
export class RendezvousgroupeComponent {
  constructor(private router: Router, private http: HttpClient) {}
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  ngOnInit(): void {
    this.userconnect;
    this.listdemongroupe()
  }
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }
  invitations: any[] = [];

      logout(){
        localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
        localStorage.removeItem(localStorage.getItem('Token')!);
        this.router.navigateByUrl('/login');
        
      }
      mongroupe: any[] = [];
      idgroupe ?: number;
      listdemongroupe(){
        const url = 'http://localhost:8083/Groupe/getotherMembers/'+this.userconnect.id;
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        this.http.get(url, { headers }).subscribe(
          (response: any) => {
            this.mongroupe = response
            this.idgroupe = this.mongroupe[0].groupeSet[0].idGroupe
            this.listdesrendezvous()
            })
      }
      lesrendezvous : any[] = [];
      listdesrendezvous(){
        const url = 'http://localhost:8083/RendezVous/listeRdvByGroupe/'+this.idgroupe;
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        this.http.get(url, { headers }).subscribe(
          (response: any) => {
            this.lesrendezvous = response
           
            console.log(this.lesrendezvous)
            
            })
      }

      AccepterRdv(id : number){
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        const accepteURL = 'http://localhost:8083/RendezVous/accepterRdv/' + id;
        this.http.post(accepteURL, null,{headers} ).subscribe((results) => {
          this.ngOnInit();
        });
      }
    
    
      RefuserRdv(id :number){
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        const refuserURL = 'http://localhost:8083/RendezVous/refuserRdv/' + id;
        this.http.post(refuserURL, null,{headers} ).subscribe((results) => {
          
          this.ngOnInit();
        });
      }

}
