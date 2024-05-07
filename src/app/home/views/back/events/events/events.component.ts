import { ReservationService } from 'src/app/home/services/resevent.service';
import { EventService } from './../../../../services/event.service';
import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from 'src/app/home/services/authentication.service'; // Assurez-vous d'importer AuthenticationService depuis le bon chemin
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: any[] | undefined;
  reservationsMap: { [eventId: number]: any[] } = {};
  showAddForm: boolean = false;
  deleteMessage: string | undefined;
  remainingEventsCount: number = 0;

  constructor(
    private es: EventService,
    private reservationService: ReservationService,
    private authenticationService: AuthenticationService // Injection du service d'authentification
  ) { }
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  ngOnInit(): void {
    this.getAllEvents();
    this.calculateRemainingEvents();
  }

  getImageUrlWithToken(imageUrl: string): string {
    const token = localStorage.getItem('Token');
    if (token) {
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
          console.log("hedy")
          console.log(data)
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
        window.location.reload();
        this.events = this.events?.filter(event => event.id !== id);
      },
      error => {
        console.error("Erreur lors de la suppression de l'événement:", error);
        console.log("Événement supprimé avec succès");
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

  reserveEvent(eventId: number, quantity: number): void {
    console.log("here")
    console.log(this.userconnect.id)
    // Vérifier si this.events est défini et s'il contient des événements
    if (!this.events || this.events.length === 0) {
        console.error('Aucun événement disponible.');
        return;
    }
  
    // Récupérer l'événement correspondant à l'ID
    const event = this.events.find(event => event.id === eventId);
  
    // Vérifier si un événement correspondant à l'ID a été trouvé
    if (!event) {
        console.error('Aucun événement trouvé avec l\'ID', eventId);
        return;
    }
  
    // Vérifier si des places sont disponibles
    if (event.places_restants < quantity) {
        // Afficher le message s'il n'y a pas suffisamment de places disponibles
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Il n'y a pas assez de places disponibles pour réserver ${quantity} places pour cet événement.`,
            confirmButtonText: 'OK'
        });
        return; // Arrêter la fonction ici
    }
  
    // Ajouter la réservation si des places sont disponibles
    this.reservationService.addReservation(eventId, quantity)
        .subscribe(
            () => {
                console.log(`Réservation de ${quantity} places créée avec succès pour l'événement avec l'ID ${eventId}`);
                // Afficher un message de succès
                Swal.fire({
                    icon: 'success',
                    title: 'Réservation effectuée!',
                    text: `Votre réservation de ${quantity} places a été effectuée avec succès.`,
                    confirmButtonText: 'OK'
                });
            },
            error => {
                console.error('Erreur lors de la réservation pour l\'événement avec l\'ID', eventId, ':', error);
                // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Une erreur s\'est produite lors de la réservation.',
                    confirmButtonText: 'OK'
                });
            }
        );
  }
  
  reservationuser:any[]=[]
  rr: { [eventId: number]: any[] } = {};
  getReservationsForEvents(): void {
    if (this.events) {
      this.events.forEach(event => {
        this.es.getReservationsForEvent(event.id).subscribe(
          (data: any[]) => {
          
            this.reservationsMap[event.id] = data;
            console.log("user")
            console.log(this.reservationsMap)
          },
          (error: any) => { // Ajouter le type pour l'erreur
            console.error(`Une erreur s'est produite lors de la récupération des réservations pour l'événement avec l'ID ${event.id}:`, error);
          }
        );
      });
    }
  }
  
 


}
