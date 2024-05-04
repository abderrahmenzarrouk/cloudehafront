import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables} from 'chart.js'

Chart.register(...registerables);
@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent {
  constructor(private router: Router, private http: HttpClient) {}
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  ngOnInit(): void {
    this.userconnect;
    this.getreclamtions()

  }
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }
  reclamationstechniques: any[] = [];
  reclamationseducatives: any[] = [];
  totalreclamations: any[] = [];
  getreclamtions(){
    const url = 'http://localhost:8083/api/v1/reclamations/all';
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.get(url, { headers }).subscribe(
      (response: any) => {
       this.totalreclamations = response;
       this.reclamationseducatives = response.filter((rec: { typeReclamtion: string; })  => rec.typeReclamtion !== "Technique" );
       this.reclamationstechniques = response.filter((rec: { typeReclamtion: string; })  => rec.typeReclamtion !== "Educative" );
       this.chartselontype()
       this.chartselondate()
       this.chartselontuteur()
       this.chartselonspecilite()
        })
      }
      logout(){
        localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
        localStorage.removeItem(localStorage.getItem('Token')!);
        this.router.navigateByUrl('/login');
        
      }

      chartselontype(){
        const myChart = new Chart("myChart", {
          type: 'doughnut',
          data: {
            labels: [
              'Educatives',
              'Techniques',
             
            ],
            datasets: [{
              label: 'Les Réclamation selon leur Type',
              data: [this.reclamationseducatives.length, this.reclamationstechniques.length],
              backgroundColor: [
                '#5CEEB5',
                '#5899FC', 
                
              ],
              hoverOffset: 4
            }]
          },
        });
      }


      chartselondate(){
        const groupedReclamations: { [key: string]: number } = {};
        this.totalreclamations.forEach(reclamation => {
          const date = new Date(reclamation.datereclamation);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const type = reclamation.typeReclamtion;
          const key = `${year}-${month}-${type}`;
          if (!groupedReclamations[key]) {
            groupedReclamations[key] = 0;
          }
          groupedReclamations[key]++;
        });

        const uniqueMonths = [...new Set(this.totalreclamations.map(reclamation => new Date(reclamation.datereclamation).getMonth() + 1))];
        const uniqueTypes = [...new Set(this.totalreclamations.map(reclamation => reclamation.typeReclamtion))];
        const typeColors: { [key: string]: string } = {
          'Technique': '#5899FC', 
          'Educative': '#5CEEB5', 
     
        };
        const datasets: { label: string, data: number[], backgroundColor: string }[] = [];
    uniqueTypes.forEach(type => {
      const data: number[] = [];
      uniqueMonths.forEach(month => {
        const key = `${new Date().getFullYear()}-${month}-${type}`;
        data.push(groupedReclamations[key] || 0);
      });
      datasets.push({
        label: type,
        data: data,
        backgroundColor: typeColors[type]
      });
    });
    new Chart('reclamationChart', {
      type: 'bar',
      data: {
        labels: uniqueMonths.map(month => this.getMonthName(month)),
        datasets: datasets
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            stacked: true
          },
          x: {
            stacked: true
          }
        }
      }
    });
  }
  getMonthName(month: number): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month - 1] || ''; // Adjust the index since month numbers are 1-based
  }

  chartselontuteur(){
    const tuteursReclamations: { [key: string]: number } = {};
    this.totalreclamations.forEach(reclamation => {
      if (reclamation.typeReclamtion === 'Technique') {
        const tuteur = reclamation.tuteurchoisit;
        if (!tuteursReclamations[tuteur]) {
            tuteursReclamations[tuteur] = 0;
        }
        tuteursReclamations[tuteur]++;
    }
      });
      const sortedTuteurs = Object.keys(tuteursReclamations).sort((a, b) => tuteursReclamations[b] - tuteursReclamations[a]);
      const topTuteurs = sortedTuteurs.slice(0, 3);
      
      const data = {
        labels: topTuteurs,
        datasets: [{
            label: 'Réclamations Assignées',
            data: topTuteurs.map(tuteur => tuteursReclamations[tuteur]),
            backgroundColor: '5899FC', 
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };
  
    new Chart('topTuteursChart', {
      type: 'bar',
      data: data,
      options: {
          scales: {
              x: {
                  beginAtZero: true
              }
          }
      }
  });
  
  
  }

  chartselonspecilite(){
    const reclamationsBySpeciality: { [key: string]: number } = {};
    this.totalreclamations.forEach(reclamation => {
      console.log(reclamation)
    var speciality = reclamation.user.typespecialite;
    
    if (!reclamationsBySpeciality[speciality]) {
        reclamationsBySpeciality[speciality] = 0;
    }
    reclamationsBySpeciality[speciality]++;
    });
    const specialities = Object.keys(reclamationsBySpeciality);
    const counts = specialities.map(speciality => reclamationsBySpeciality[speciality]);
    new Chart('reclamationsBySpecialityChart', {
      type: 'pie',
      data: {
          labels: specialities,
          datasets: [{
              label: 'Reclamations by Speciality',
              data: counts,
              backgroundColor: [
                  '#5899FC', 
                  '#5CEEB5', 
                  '#C0C0C0', 
                 
              ],
              borderColor: [
                  '#5899FC',
                  '#5CEEB5',
                  '#C0C0C0',
                  
              ],
              borderWidth: 1
          }]
      },
      options: {
          responsive: true
      }
  });
  }

}


