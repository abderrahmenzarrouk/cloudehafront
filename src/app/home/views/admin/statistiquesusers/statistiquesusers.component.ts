import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/home/services/user.service';
import { Chart, registerables} from 'chart.js'

@Component({
  selector: 'app-statistiquesusers',
  templateUrl: './statistiquesusers.component.html',
  styleUrls: ['./statistiquesusers.component.css']
})
export class StatistiquesusersComponent {
  constructor(private router: Router, private userService : UserService ){}
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);

  tuteurs: any[] = [];
  etudiants: any[] = [];
  totalusers: any[] = [];
  ngOnInit(): void {
    this.userconnect;
    this.getusers()
   
  }
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }
  getusers() {
    this.userService.getUsers().subscribe(
      (users: any[]) => {
        this.totalusers = users.filter(user => user.userRole.role !== "Admin");
        this.etudiants = users.filter(user => user.userRole.role !== "Admin" && user.userRole.role !== "Tuteur");
        this.tuteurs = users.filter(user => user.userRole.role !== "Admin" && user.userRole.role !== "Etudiant");
        this.chartselontype()
        this.chartselonetudiantspecilite()
        this.chartdesetudiantinactive()
        this.chartlineusers()
        this.chartselonage()
       
      }
    );
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
          'Etudiants',
          'Tuteurs',
         
        ],
        datasets: [{
          label: 'Les Réclamation selon leur Type',
          data: [this.etudiants.length, this.tuteurs.length],
          backgroundColor: [
            '#5CEEB5',
            '#5899FC', 
            
          ],
          hoverOffset: 4
        }]
      },
    });
  }
  chartselonetudiantspecilite(){
    const etudiantBySpeciality: { [key: string]: number } = {};
    this.etudiants.forEach(user => {
    var speciality = user.typespecialite;
    
    if (!etudiantBySpeciality[speciality]) {
      etudiantBySpeciality[speciality] = 0;
    }
    etudiantBySpeciality[speciality]++;
    });
    console.log(etudiantBySpeciality)
    const specialities = Object.keys(etudiantBySpeciality);
    const counts = specialities.map(speciality => etudiantBySpeciality[speciality]);
    
    new Chart('etudiantBySpecialityChart', {
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
   activeUsers : number = 0;
   inactiveUsers = 0;
  chartdesetudiantinactive(){
    const today = new Date();
    const cutoffDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); 

    
    
    this.etudiants.forEach(student => {
      const derniercnx = new Date(student.derniercnx);
      if (derniercnx >= cutoffDate) {
          this.activeUsers++;
      } else {
          this.inactiveUsers++;
      }
    });
    const data = {
      labels: ['Actif', 'Inactif'],
      datasets: [{
          label: 'Utilisateurs',
          data: [this.activeUsers, this.inactiveUsers],
          backgroundColor: ['#0CBC87', '#F7C32E'],
          hoverOffset: 4
      }]
  };
  new Chart('userActivityChart', {
    type: 'polarArea',
    data: data,

});
  }

  chartlineusers(){
    const registrationDates = this.totalusers.map((user) => new Date(user.dateregistration));
    const registrationCounts: { [key: string]: number } = {};
    
    registrationDates.forEach((date) => {
        const month = date.toLocaleString('default', { month: 'short' });
        if (!registrationCounts[month]) {
            registrationCounts[month] = 0;
        }
        registrationCounts[month]++;
    });
    
    // Prepare data for chart
    const data = {
        labels: Object.keys(registrationCounts),
        datasets: [{
            label: 'User Registrations',
            data: Object.values(registrationCounts),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };
    
    new Chart('registrationChart', {
        type: 'line',
        data: data,
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

  chartselonage(){
    const ageDistribution: { [key: string]: number } = {};
    this.totalusers.forEach(user => {
        const ageGroup = Math.floor(user.age / 10) * 10;
        if (!ageDistribution[ageGroup]) {
            ageDistribution[ageGroup] = 0;
        }
        ageDistribution[ageGroup]++;
    });
    const ageGroups = Object.keys(ageDistribution).map(ageGroup => `${ageGroup}-${parseInt(ageGroup) + 9}`);
    const counts = Object.values(ageDistribution);
    new Chart('ageDistributionChart', {
      type: 'bar',
      data: {
          labels: ageGroups,
          datasets: [{
              label: 'Age des Utilisateurs',
              data: counts,
              backgroundColor: 'rgba(54, 162, 235, 0.5)', 
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
          }]
      },

  });
  }

}
