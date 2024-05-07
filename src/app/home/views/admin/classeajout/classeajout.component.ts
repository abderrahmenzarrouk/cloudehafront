import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClasseServiceService } from 'src/app/home/services/classe-service.service';
import { UserService } from 'src/app/home/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classeajout',
  templateUrl: './classeajout.component.html',
  styleUrls: ['./classeajout.component.css']
})
export class ClasseajoutComponent {
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  constructor(private router: Router, private userService : UserService, private classeService : ClasseServiceService, private http: HttpClient ){}
  users: any[] = [];
  ngOnInit(): void {
    this.userconnect;
    this.getAllClasses()
    this.getAllressources()
  }



  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }

  logout(){
    localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
    localStorage.removeItem(localStorage.getItem('Token')!);
    this.router.navigateByUrl('/login');
    
  }

  classes: any[] = []; // Tableau pour stocker les classes
  ressources: any[] = [];
  selectedRessources: Set<number> = new Set<number>();

  // Méthode pour récupérer toutes les classes
  getAllClasses() {
    this.classeService.getAllClasses().subscribe((res: any[]) => {
     
      this.classes = res; // Assignation des données reçues au tableau 'classes'
      
    });
  }
  getAllressources() {
    this.classeService.getAllressources().subscribe((res: any[]) => {
      
      this.ressources = res; // Assignation des données reçues au tableau 'classes'
      
    });
  }
  isHidden: boolean = false;
  hiddenClasses: { [key: number]: boolean } = {};

  afficher(id: number) {
      if (this.hiddenClasses[id] === undefined) {
          this.hiddenClasses[id] = true; // Set as hidden initially
      } else {
          this.hiddenClasses[id] = !this.hiddenClasses[id]; // Toggle hidden state
      }
      this.ressources.forEach(element => {
       console.log("here")
        if(element.classes.length !== 0){
          console.log("here not empty")
          console.log(element.classes[0].idClasse)
          console.log(id)
          if(element.classes[0].idClasse===id) {
            console.log("here id")
            console.log(element.idRessource)
            this.selectedRessources.add(element.idRessource)
            console.log("list"+this.selectedRessources)
           }
        }
        
      
        
      });
      
     
  }
deleteClasse(id:number){
  console.log("id" + id)
  this.classeService.deleteClasse(id).subscribe((res) => {
    Swal.fire({
      icon: 'success',
      title: 'Suppression réussite',
      text: 'Classe Supprimer avec Succes',
      showConfirmButton: false,
      timer: 2500
    }).then(() => {
      
      window.location.reload()
      
    });
  })
}


isRessourceSelected(id: number,idrc : any,idc : number): boolean {
 

  return this.selectedRessources.has(id);
}

toggleRessourceSelection(id: number,idrc : any,idc : number): void {


  if (!this.selectedRessources.has(id)) {
      this.selectedRessources.add(id);
  } else {
      this.selectedRessources.delete(id);
  }
 
  console.log(this.selectedRessources)
}

saveSelectedRessources(id : number) {
  const selectedRessourcesList = Array.from(this.selectedRessources);
  const token = localStorage.getItem('Token');
  const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  const url = 'http://localhost:8083/classes/add-classe-ressources/'+id;
    this.http.post(url, selectedRessourcesList,{headers}).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Ajout réussie',
          text: 'Ressource Affecter à ce Classe avec Succes',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          console.log(response)
          window.location.reload()
          
        });
      },
      (error: any) => {
        console.error(error);
        // Handle error response here
      }
    );
  
}

}
