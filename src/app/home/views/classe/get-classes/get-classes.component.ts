import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../classe.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-get-classes',
  templateUrl: './get-classes.component.html',
  styleUrls: ['./get-classes.component.css']
})
export class GetClassesComponent implements OnInit {
  classes: any[] = []; // Tableau pour stocker les classes
  ressources: any[] = [];
  selectedRessources: Set<number> = new Set<number>();

  constructor(private classeService: ClasseService, private router: Router,private http: HttpClient) {}

  ngOnInit() {
    this.getAllClasses();
    this.getAllressources(); // Appel à la méthode pour récupérer les classes lors de l'initialisation
 
    
    
  }

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
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
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

  const url = 'http://localhost:8083/PI/classes/add-classe-ressources/'+id;
    this.http.post(url, selectedRessourcesList).subscribe(
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
