import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



export class RendezVousList {
  constructor(
    public idRdv: string,
    public duree: string,
    public date: string,
    public heure: string,
    public description: string,
    public points: string,
    public salle: string,
    public etat: string,
    public lienMeet: string
    
  ) {}
}

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

  hiddenpostA : boolean = true;
  
  voirForm(){
    this.hiddenpostY = true; // Afficher le formulaire 1
    this.hiddenpostX = false; // Masquer le formulaire 2
    this.hiddenpostA = false; // Masquer la table
    
  }

  hiddenpostY : boolean = false;
  hiddenpostX : boolean = false;
  voirFormEdit(){
    this.hiddenpostX = true; // Afficher le formulaire 2
    this.hiddenpostY = false; // Masquer le formulaire 1
    this.hiddenpostA = false; // Masquer la table
  }


  

  postForm = new FormGroup({
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    heure: new FormControl('', [Validators.required]),
    duree: new FormControl('', [Validators.required])
  });

  IdAdmin = 0  

  getAdmin() {
    
    this.http.get<any>('http://localhost:8083/Groupe/nomAdmin/' + this.idgroupe).subscribe(
      response => {
        console.log("response", response);
        this.IdAdmin = response;
        console.log(response);
        
      },
      error => {
        console.error('Erreur lors de la récupération des rendez-vous : ', error);
      }
    );
  }


  CreerRdv(){
    const payload: any = {
      description : this.postForm.value.description|| '',
     date : this.postForm.value.date || "",
     heure: this.postForm.value.heure|| "",
     duree: this.postForm.value.duree|| ""
    };
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const url = 'http://localhost:8083/RendezVous/addRdv/'+this.idgroupe;
    this.http.post(url,this.postForm.value,{ headers }).subscribe(
      (response: any) => {
        console.log(this.postForm.value)
        Swal.fire({
          icon: 'success',
          title: 'Rendez Vous Réserver Avec Succées',
          text: 'Votre Rendez Vous à été créer avec Succées vous serait son Administrateur',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          this.router.navigate(['/list-groups']);
          this.router.navigate(['/rendezvousgroupe']);
        });
      },
      (error: any) => {
        console.error(error);
        // Handle error response here
      }
    );

  }


  

  


  heuresPredefinies: string[] = []; 
    

  getHeuresDispo() {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http
      .get<any>('http://localhost:8083/RendezVous/heuresDisponibles/' + this.postForm.value.date + '/' + this.idgroupe, { headers })
      .subscribe(
        (response) => {
          console.log(response);
          this.heuresPredefinies = response;
        },
        (error) => {
          console.error('Erreur lors de la récupération des heures disponibles : ', error);
        }
      );
  }



  getHeuresDispoEdit() {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http
      .get<any>('http://localhost:8083/RendezVous/heuresDisponibles/' + this.EditForm.value.date + '/' + this.idgroupe, { headers })
      .subscribe(
        (response) => {
          console.log(response);
          this.heuresPredefinies = response;
        },
        (error) => {
          console.error('Erreur lors de la récupération des heures disponibles : ', error);
        }
      );
  }

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
        console.log(this.idgroupe)
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

      EditForm = new FormGroup({
        idRdv: new FormControl('', Validators.required),
        mode: new FormControl('', Validators.required),
        salle: new FormControl('', [Validators.required]),
        lienMeet: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        heure: new FormControl('', [Validators.required]),
        duree: new FormControl('', [Validators.required])
      });
  
      
      ModifierRdv(rendv: RendezVousList)
      {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        this.EditForm.patchValue({
          idRdv: rendv.idRdv,
          salle: rendv.salle,
          date: rendv.date,
          lienMeet: rendv.lienMeet,
          description: rendv.description,
          duree: rendv.duree,
          heure: rendv.heure // Définir simplement la valeur de l'heure sans Validators.required
        });
      }

      EditRdv(){
        const payload: any = {
          idRdv: this.EditForm.value.idRdv|| '',
          salle: this.EditForm.value.salle|| '',
          lienMeet: this.EditForm.value.lienMeet|| '',
          description : this.EditForm.value.description|| '',
         date : this.EditForm.value.date || "",
         heure: this.EditForm.value.heure|| "",
         duree: this.EditForm.value.duree|| ""
        };
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        const url = 'http://localhost:8083/RendezVous/updateRdv/'+this.idgroupe;
         this.http.put(url,this.EditForm.value,{ headers }).subscribe(
      (response: any) => {
        console.log(this.EditForm.value)
        Swal.fire({
          icon: 'success',
          title: 'Rendez Vous Mise à Jour Avec Succées',
          text: 'Votre Rendez Vous à été Mise à Jour avec Succées ',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          this.router.navigate(['/list-groups']);
          this.router.navigate(['/rendezvousgroupe']);
        });
      },
      (error: any) => {
        console.error(error);
        // Handle error response here
      }
    );
      }

}
