import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ItemService } from 'src/app/home/services/itemservice.service';
import { UserService } from 'src/app/home/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articlestat',
  templateUrl: './articlestat.component.html',
  styleUrls: ['./articlestat.component.css']
})
export class ArticlestatComponent {
  addItemForm: FormGroup;
  documentationFile:string | ArrayBuffer | null | undefined;
  imageUrl: string | ArrayBuffer | null | undefined;
  constructor(private router: Router, private userService : UserService,private formBuilder: FormBuilder, private itemService : ItemService ){
    this.addItemForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: '',
      nombreDePoints: '',
      image: '',
      typeItem: 'FORMATION',
      mode: '',
      documentation:''
    });
  }
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);

  tuteurs: any[] = [];
  ngOnInit(): void {
    this.userconnect;
    this.getItems()
   
  }
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }
  logout(){
    localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
    localStorage.removeItem(localStorage.getItem('Token')!);
    this.router.navigateByUrl('/login');
    
  }

  

  items: any[] = [];
  formations: any[] = [];
  documentation: any[] = [];
  presentiel: any[] = [];
  enligne: any[] = [];
  getItems(): void {
    this.itemService.getAllItems().subscribe({
      next: (items: any[]) => {
        this.items = items;
        this.documentation = items.filter((rec: { typeItem: string; })  => rec.typeItem !== "FORMATION");
        this.formations = items.filter((rec: { typeItem: string; })  => rec.typeItem !== "DOCUMENTATION");
        this.presentiel = this.formations.filter((rec: { mode: string; })  => rec.mode !== "LIGNE");
        this.enligne = this.formations.filter((rec: { mode: string; })  => rec.mode !== "PRESENT");
        console.log( this.documentation)
        console.log(this.formations)
        console.log('Liste des items :', this.items);
        this.chartselontype()
        this.chartselonspecilite()
        this.meilleursarticles()
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des items :', error);
      }
    });
  }

  chartselontype(){
    const myChart = new Chart("myChart", {
      type: 'doughnut',
      data: {
        labels: [
          'Documentations',
          'Formations',
         
        ],
        datasets: [{
          label: 'Les Articles selon leur Type',
          data: [this.documentation.length, this.formations.length],
          backgroundColor: [
            '#5CEEB5',
            '#5899FC', 
            
          ],
          hoverOffset: 4
        }]
      },
    });
  }

  chartselonspecilite(){
    
    new Chart('selonmode', {
      type: 'pie',
      data: {

          datasets: [{
              label: 'Les Formations selon leur mode',
              data: [this.presentiel.length, this.enligne.length],
              backgroundColor: [
                  '#5899FC', 
                  '#5CEEB5', 
     
                 
              ],
              borderColor: [
                  '#5899FC',
                  '#5CEEB5',
                 
                  
              ],
              borderWidth: 1
          }]
      },
      options: {
          responsive: true
      }
  });
  }

  meilleursarticles(){
    this.items.sort((a, b) => b.note - a.note);
    const bestThree = this.items.slice(0, 3);
    console.log(bestThree);

    const data = {
      labels: this.items.map(item => item.nom),
      datasets: [{
          label: 'Réclamations Assignées',
          data: this.items.map(item => item.note), 
          backgroundColor: 'rgba(89, 153, 252, 0.5)', 
          borderColor: 'rgba(89, 153, 252, 1)',
          borderWidth: 1
      }]
  };
        new Chart('topformation', {
          type: 'bar',
          data: data,
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
        });
  }

}
