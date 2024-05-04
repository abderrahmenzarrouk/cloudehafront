import { Component } from '@angular/core';
import { EventService } from 'src/app/home/services/event.service';
import { ReservationService } from 'src/app/home/services/resevent.service';


@Component({
  selector: 'app-resevents',
  templateUrl: './resevents.component.html',
  styleUrls: ['./resevents.component.css']
})
export class ReseventsComponent {
  events: any[] = [];
  reservations: any[] = [];

  constructor(
    private eventService: EventService,
    private reservationService: ReservationService
  ) { }

  ngOnInit(): void {
    this.loadEvents();
    this.loadReservations();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(
      (data: any[]) => {
        this.events = data;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des événements:', error);
      }
    );
  }

  loadReservations() {
    this.reservationService.getAllReservations().subscribe(
      (data: any[]) => {
        this.reservations = data;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des réservations:', error);
      }
    );
  }

  addReservation(eventId: number) {
    this.reservationService.addReservation(eventId).subscribe(
      (data: any) => {
        console.log('Réservation ajoutée avec succès:', data);
        // Rechargez les réservations après l'ajout
        this.loadReservations();
      },
      error => {
        console.error('Une erreur s\'est produite lors de l\'ajout de la réservation:', error);
      }
    );
  }
 
}
