import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClasseServiceService } from 'src/app/home/services/classe-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clssedispo',
  templateUrl: './clssedispo.component.html',
  styleUrls: ['./clssedispo.component.css']
})
export class ClssedispoComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient,private classeService: ClasseServiceService){}
  classes: any[] = []; 
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  ngOnInit(): void {
    
    this.getAllClasses();
    this.getinvitation()
    this.annonceForm = this.formBuilder.group({
      date_debut: ['', [Validators.required]],
      date_fin: ['', [Validators.required]],
  
    });
  }
  logout(){
    localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
    localStorage.removeItem(localStorage.getItem('Token')!);
    this.router.navigateByUrl('/login');
    
  }
  getAllClasses() {
    this.classeService.getAllClasses().subscribe((res: any[]) => {
      console.log(res)
      this.classes = res.filter(c => c.dispo === true);
      console.log(this.classes)
      
    });
  }
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }
   
  hiddenClasses: { [key: number]: boolean } = {};

  ressourceclasse: any[] = [];

  getClasseRessources(id:number) {
    if (this.hiddenClasses[id] === undefined) {
      this.hiddenClasses[id] = false; // Set as shown initially
  } else {
      this.hiddenClasses[id] = !this.hiddenClasses[id]; // Toggle hidden state
      Object.keys(this.hiddenClasses).forEach(key => {
        if (Number(key) !== id) {
            this.hiddenClasses[Number(key)] = false;
        }
    });
  }
 
    this.classeService.getClasseRessources(id).subscribe((res: any[]) => {
      
      this.ressourceclasse = res;

      console.log(res)
      
    });
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

  annonceForm!: FormGroup;
  annoncePayload: any = {
    date_debut: new Date(),
    date_fin: new Date(),
  };

  insertEvent(id:number){
    console.log(this.userconnect.groupeSet[0].idGroupe)
    const requestData = {

      debutReservation: this.annonceForm.get('date_debut')?.value,
      finReservation: this.annonceForm.get('date_fin')?.value
   
    };

    console.log(this.annonceForm.get('date_debut')?.value)
 console.log(requestData)
    const url = 'http://localhost:8083/reservations/addReservation/'+id+'/'+this.userconnect.groupeSet[0].idGroupe;
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.post(url,requestData, { headers }).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Reservation ajoutée',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          this.router.navigateByUrl('/classerevervation');
        });
      },
      (error: any) => {
        console.error(error);
        // Handle error response here
      }
    )
  }



}

