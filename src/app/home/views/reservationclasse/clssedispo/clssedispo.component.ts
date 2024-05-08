import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClasseService } from '../../classe/classe.service';

@Component({
  selector: 'app-clssedispo',
  templateUrl: './clssedispo.component.html',
  styleUrls: ['./clssedispo.component.css']
})
export class ClssedispoComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient,private classeService: ClasseService){}
  classes: any[] = []; 
  ngOnInit(): void {
    const user = {
      idGroupe: '1',
    };
    const jsonuser = JSON.stringify(user);
    localStorage.setItem('user', jsonuser);
    this.getAllClasses();
  }
  getAllClasses() {
    this.classeService.getAllClasses().subscribe((res: any[]) => {
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

}

