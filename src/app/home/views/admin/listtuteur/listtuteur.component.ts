import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/home/services/user.service';

@Component({
  selector: 'app-listtuteur',
  templateUrl: './listtuteur.component.html',
  styleUrls: ['./listtuteur.component.css']
})
export class ListtuteurComponent implements OnInit{
  constructor(private router: Router, private userService : UserService ){}
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  
  tuteurs: any[] = [];
  ngOnInit(): void {
    this.userconnect;
    this.getusers()
  }
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }
  getusers() {
    this.userService.getUsers().subscribe(
      (tuteurs: any[]) => {
        
        this.tuteurs = tuteurs.filter(user => user.userRole.role !== "Admin" && user.userRole.role !== "Etudiant");
        console.log(this.tuteurs)
       
      }
    );
  }

}
