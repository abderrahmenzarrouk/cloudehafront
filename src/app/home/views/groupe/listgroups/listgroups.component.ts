import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


export class Groupe {
  constructor(
    public idGroupe: string,
    public annee: string,
    public option: string,
    public nom_Groupe: string,
    public total_Score: number,
    public nom_Tuteur: string,
    public statut: string,
    public etat: number,
    public sujet: string
  ) {}
}





@Component({
  selector: 'app-listgroups',
  templateUrl: './listgroups.component.html',
  styleUrls: ['./listgroups.component.css']
})
export class ListgroupsComponent {
  constructor(private router: Router, private http: HttpClient) {}
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  ngOnInit(): void {
    this.userconnect;
    this.getgroupes()
    this.getinvitation()
  }
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }


  

  EditForm = new FormGroup({
    idGroupe: new FormControl('', Validators.required),
    statut: new FormControl('', Validators.required),
    annee: new FormControl('', Validators.required),
    nom_Tuteur: new FormControl('', Validators.required),
    etat: new FormControl('', Validators.required),
    option: new FormControl('', [Validators.required]),
    nom_Groupe: new FormControl('', [Validators.required]),
    sujet: new FormControl('', [Validators.required])
  });


  EditGroupe(){
    const payload: any = {
      idGroupe: this.EditForm.value.idGroupe|| '',
      nom_Tuteur: this.EditForm.value.nom_Tuteur|| '',
      statut: this.EditForm.value.statut|| '',
      etat: this.EditForm.value.statut|| '',
      annee: this.EditForm.value.annee|| '',
      option: this.EditForm.value.option|| '',
      nom_Groupe : this.EditForm.value.nom_Groupe|| '',
      sujet : this.EditForm.value.sujet || "",
};
const token = localStorage.getItem('Token');
const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
const url = 'http://localhost:8083/Groupe/updateGroupe';
this.http.put(url,this.EditForm.value,{ headers }).subscribe(
(response: any) => {
console.log(this.EditForm.value)
Swal.fire({
icon: 'success',
title: 'Groupe Mise à Jour Avec Succées',
text: 'Votre Groupe à été Mise à Jour avec Succées ',
showConfirmButton: false,
timer: 2500
}).then(() => {
this.router.navigate(['/list-groups']);
});
},
(error: any) => {
console.error(error);
// Handle error response here
}
);
}
  
  ModifierGroupe(groupe: Groupe)
  {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.EditForm.patchValue({
      idGroupe: groupe.idGroupe,
      annee: groupe.annee,
      option: groupe.option,
      nom_Groupe: groupe.nom_Groupe,
      sujet: groupe.sujet,
      
    });
  }




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
      



      options: string[] = ['ArcTIC', 'NIDS', 'DS', 'BI', 'TWIN', 'SAE', 'SIM', 'INFINI', 'IoSYS'];
      annees: string[] = ['2021','2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];

      postForm = new FormGroup({
        nom_Groupe: new FormControl('', [Validators.required]),
        annee: new FormControl('', [Validators.required]),
        option: new FormControl('', [Validators.required]),
        sujet: new FormControl('', [Validators.required])
      });



      


      CreerGroupe(){
        const payload: any = {
          nom_Groupe : this.postForm.value.nom_Groupe|| '',
         annee : this.postForm.value.annee || "",
         option: this.postForm.value.option|| "",
         sujet: this.postForm.value.sujet|| ""
        };
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        const url = 'http://localhost:8083/Groupe/addGroupe/'+this.userconnect.id;
        this.http.post(url,this.postForm.value,{ headers }).subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Groupe Ajouter',
              text: 'Votre Groupe à été créer avec Succées vous serait son Administrateur',
              showConfirmButton: false,
              timer: 2500
            }).then(() => {
              this.router.navigate(['/list-groups']);
              
            });
          },
          (error: any) => {
            console.error(error);
            // Handle error response here
          }
        );

      }
      groupes: any[] = [];
      idCreateurGrp: number[] = [];
      IDconn = this.userconnect.id
      getgroupes() {
        const url = 'http://localhost:8083/Groupe/getAllGroupes';
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        
        this.http.get(url, { headers }).subscribe(
          (response: any) => {
            this.groupes = response;
            // Initialiser le tableau idCreateurGrp avec des zéros
            this.idCreateurGrp = new Array(this.groupes.length).fill(0);
            
            // Boucler à travers les groupes pour affecter les valeurs aux variables idCreateurGrp
            for (let i = 0; i < this.groupes.length && i < 6; i++) {
              this.idCreateurGrp[i] = this.groupes[i].nom_Tuteur;
              console.log("hedha l id createur",this.idCreateurGrp[i])
              console.log("hedha id user conn ", this.userconnect.id)
            }
            
            console.log(this.groupes);
          },
          (error: any) => {
            console.error(error);
            // Gérer ici les erreurs de réponse
          }
        );
      }
      


      logout(){
        localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
        localStorage.removeItem(localStorage.getItem('Token')!);
        this.router.navigateByUrl('/login');
        
      }
      envoyerinvitation(idgroupe:number){
        const url = 'http://localhost:8083/Invitation/addInvitation/'+this.userconnect.id+'/'+idgroupe;
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        this.http.post(url,null, { headers }).subscribe(
          (response: any) => {
            
            Swal.fire({
              icon: 'success',
              title: 'Invitation envoyer',
              text: 'Votre invitation pour rejoindre ce groupe a été envoyer avec succeé',
              showConfirmButton: false,
              timer: 2500
            }).then(() => {
              this.ngOnInit()
              
            });
            })
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

