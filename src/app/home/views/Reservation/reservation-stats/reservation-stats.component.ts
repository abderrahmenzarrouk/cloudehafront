
import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';


@Component({
  selector: 'app-reservation-stats',
  templateUrl: './reservation-stats.component.html',
  styleUrls: ['./reservation-stats.component.css']
})
export class ReservationStatsComponent implements OnInit {
  stats: any;

  constructor(private reservationService: ReservationService) { }

 // Dans votre composant Angular, par exemple dans ngOnInit
ngOnInit(): void {
  this.reservationService.getReservationStats().subscribe(data => {
    this.stats = data;

    // Afficher les statistiques par heure dans la console
    console.log('Statistiques par heure :', Object.fromEntries(this.stats.statsParHeure.entries()));

    // Afficher les statistiques par jour de la semaine dans la console
    console.log('Statistiques par jour de la semaine :', Object.fromEntries(this.stats.statsParJour.entries()));
  });
}


}
