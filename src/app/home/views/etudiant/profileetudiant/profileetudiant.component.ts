import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profileetudiant',
  templateUrl: './profileetudiant.component.html',
  styleUrls: ['./profileetudiant.component.css']
})
export class ProfileetudiantComponent implements OnInit{
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  constructor(private router: Router){}
  ngOnInit(): void {
    this.userconnect;
  }
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }
}
