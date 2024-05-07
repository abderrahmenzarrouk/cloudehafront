import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ClasseServiceService } from 'src/app/home/services/classe-service.service';
import { UserService } from 'src/app/home/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-statclasse',
  templateUrl: './statclasse.component.html',
  styleUrls: ['./statclasse.component.css']
})
export class StatclasseComponent {
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  constructor(private router: Router, private userService : UserService , private http: HttpClient, private classeService : ClasseServiceService){}
  users: any[] = [];
  ngOnInit(): void {
    this.userconnect;
    this.reservationstat()
    this.getAllClasses()

  }



  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }

  logout(){
    localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
    localStorage.removeItem(localStorage.getItem('Token')!);
    this.router.navigateByUrl('/login');
    
  }
  stat :any[]=[];
  statparjour :any[]=[];
  statparheure :any;
  reservationstat() {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const url = "http://localhost:8083/reservations/statistiques";
      this.http.get(url,{headers}).subscribe(
        (response: any) => {
          this.stat=response;
          
          this.statparheure = response.statsParHeure;
          this.statparjour = response.statsParJour;
          this.chartparjour()
          this.chartparheure()
          console.log(this.statparheure)
          console.log(this.statparjour)
          
        },
        (error: any) => {
          console.error(error);
          // Handle error response here
        }
      );
    
  }
  classes: any[] = []; 
  classesdispo: any[] = []; 
  classesnondispo: any[] = []; 

  getAllClasses() {
    this.classeService.getAllClasses().subscribe((res: any[]) => {
     
      this.classes = res; 
      console.log(this.classes)
      this.classesdispo = res.filter((rec: { dispo: boolean; })  => rec.dispo === true );
      this.classesnondispo = res.filter((rec: { dispo: boolean; })  => rec.dispo === false );
      this.chartselondispo()
      
    });
  }
  chartselondispo(){
    const myChart = new Chart("myChart", {
      type: 'doughnut',
      data: {
        labels: [
          'disponible',
          'non disponible',
         
        ],
        datasets: [{
          label: 'Les classes selon leur disponibilité',
          data: [this.classesdispo.length,this.classesnondispo.length],
          backgroundColor: [
            '#5CEEB5',
            '#5899FC', 
            
          ],
          hoverOffset: 4
        }]
      },
    });
  }

  chartparjour(){
    const days = Object.keys(this.statparjour);
    const dataValues = Object.values(this.statparjour);
    const myChart = new Chart('myChartjour', {
      type: 'bar',
      data: {
        labels: days,
        datasets: [{
          label: 'Number of Reservations',
          data: dataValues,
          backgroundColor: 'rgba(54, 162, 235, 0.5)', // Adjust color as needed
          borderColor: 'rgba(54, 162, 235, 1)', // Adjust color as needed
          borderWidth: 1
        }]
      },

    });
  }

  chartparheure(){
    const times = Object.keys(this.statparheure).map(Number);
    const reservations = Object.values(this.statparheure);
    const myChart = new Chart('myChartheure', {
      type: 'line',
      data: {
        labels: times,
        datasets: [{
          label: 'Number of Reservations',
          data: reservations,
          backgroundColor: 'rgba(54, 162, 235, 0.5)', // Adjust color as needed
          borderColor: 'rgba(54, 162, 235, 1)', // Adjust color as needed
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
              title: {
                  display: true,
                 
              }
          },
          y: {
              title: {
                  display: true,
                 
              }
          }
      }
      }
    });
  }
}
 
