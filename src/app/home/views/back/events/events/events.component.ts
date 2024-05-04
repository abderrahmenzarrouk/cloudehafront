import { ReservationService } from 'src/app/home/services/resevent.service'; // Assurez-vous que le chemin d'accès est correct
import { EventService } from './../../../../services/event.service';
import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: any[] | undefined;
  reservationsMap: { [eventId: number]: any[] } = {}; // Map pour stocker les réservations par eventId
  showAddForm: boolean = false;
  deleteMessage: string | undefined; // Déclaration de la propriété deleteMessage
  remainingEventsCount: number = 0; // Déclaration de la propriété

  constructor(
    private es: EventService,
    private reservationService: ReservationService // Injection du service de réservation
  ) { }

  ngOnInit(): void {
    this.getAllEvents();
    this.calculateRemainingEvents(); // Appeler la méthode pour afficher la notification
  }

  getImageUrlWithToken(imageUrl: string): string {
    const token = localStorage.getItem('Token');
    if (token) {
      // Check if image URL already has query parameters
      const separator = imageUrl.includes('?') ? '&' : '?';
      return `${imageUrl}${separator}token=${token}`;
    } else {
      return imageUrl;
    }
  }
  getAllEvents(): void {
    
    this.es.getAllEvents()
      .subscribe(
        (data: any[]) => {
          this.events = data;
          console.log(data)
          this.generateQRCodes();
          this.getReservationsForEvents();
          this.calculateRemainingEvents();
        },
        error => {
          console.error('Une erreur s\'est produite lors de la récupération des événements:', error);
        }
      );
  }

  calculateRemainingEvents(): void {
    
    if (this.events) {
      const currentDate = new Date();
      const remainingEvents = this.events.filter(event => new Date(event.date_fin) >= currentDate);
      this.remainingEventsCount = remainingEvents.length;
    }
  }

  deleteEvent(id: any) {
    this.es.deleteEvent(id).subscribe(
      () => {
        console.log("Événement supprimé avec succès");
        window.location.reload(); // Actualiser la page après la suppression
        this.events = this.events?.filter(event => event.id !== id);
      },
      error => {
        console.error("Erreur lors de la suppression de l'événement:", error);
        console.log("Événement supprimé avec succès"); // Ajoutez ceci pour vérifier si l'événement est supprimé avec succès
        window.location.reload();
      }
    );
  }

  shareOnTwitter(event: any) {
    const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const startDate = new Date(event.date_debut).toISOString();
    const endDate = new Date(event.date_fin).toISOString();
    const text = `Je participe à "${event.nom_event}" du ${startDate} au ${endDate}. Rejoignez-moi!`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  generateQRCodes(): void {
    this.events?.forEach(event => {
      const eventInfo = `Nom de l'événement : ${event.nom_event}\n`
                      + `Date de début : ${event.date_debut}\n`
                      + `Date de fin : ${event.date_fin}\n`
                      + `Places restantes : ${event.places_restants}\n`;

      QRCode.toDataURL(eventInfo, (err, url) => {
        if (err) console.error(err);
        event.qrCodeUrl = url;
        event.isAvailable = this.isEventAvailable(event.date_fin);
      });
    });
  }

  isEventAvailable(date_fin: string): boolean {
    const currentDate = new Date();
    const eventEndDate = new Date(date_fin);
    return currentDate <= eventEndDate;
  }

  reserveEvent(eventId: number): void {
    this.reservationService.addReservation(eventId)
      .subscribe(
        () => {
          console.log('Réservation créée avec succès pour l\'événement avec l\'ID', eventId);
          // Rafraîchir la liste des événements après la réservation
          this.getAllEvents();
        },
        error => {
          console.error('Erreur lors de la réservation pour l\'événement avec l\'ID', eventId, ':', error);
          // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
        }
      );
  }
  getReservationsForEvents(): void {
    if (this.events) {
      this.events.forEach(event => {
        this.es.getReservationsForEvent(event.id).subscribe(
          (data: any[]) => {
            this.reservationsMap[event.id] = data;
          },
          error => {
            console.error(`Une erreur s'est produite lors de la récupération des réservations pour l'événement avec l'ID ${event.id}:`, error);
          }
        );
      });
    }
  }
}
