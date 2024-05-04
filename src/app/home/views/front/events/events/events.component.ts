import { ReservationService } from 'src/app/home/services/resevent.service';
import { EventService } from './../../../../services/event.service';
import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: any[] | undefined;
  showAddForm: boolean = false;
  deleteMessage: string | undefined; // Déclaration de la propriété deleteMessage
  remainingEventsCount: number = 0; // Déclaration de la propriété

  constructor(private es: EventService,
    private reservationService: ReservationService // Injection du service de réservation

  ) { } 

  ngOnInit(): void {
    this.getAllEvents();
    this.calculateRemainingEvents(); // Appeler la méthode pour afficher la notification


  }

  getAllEvents(): void {
    this.es.getAllEvents()
      .subscribe(
        (data: any[]) => {
          this.events = data;
          this.generateQRCodes();
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

      Swal.fire({
        title: 'Événements à venir',
        html: `On a ${this.remainingEventsCount} événements à venir.
        N'hésitez pas à participer!`,
        icon: 'info'
      });
    }
  }
  

  

  shareOnTwitter(event: any) {
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
                      + `Lien vers l'image : ${event.image}\n`; // Correction de la concaténation

      QRCode.toDataURL(eventInfo, (err, url) => {
        if (err) console.error(err);
        event.qrCodeUrl = url;
        event.isAvailable = this.isEventAvailable(event.date_fin); // Passer directement la date

      });
    });
  }
  isEventAvailable(date_fin: string): boolean { // Changer le type d'argument
    const currentDate = new Date();
    const eventEndDate = new Date(date_fin); // Convertir la date de fin en objet Date
    return currentDate <= eventEndDate; // Comparer les dates
  }
  filterAvailableEvent(){
    return this.events?.filter(x => this.isEventAvailable(x.date_fin));
}
  reserveEvent(eventId: number): void {
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
    if (event.places_restants === 0) {
        // Afficher le message s'il n'y a plus de places disponibles
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Il n\'y a plus de places disponibles pour cet événement.',
            confirmButtonText: 'OK'
        });
        return; // Arrêter la fonction ici
    }

    // Ajouter la réservation si des places sont disponibles
    this.reservationService.addReservation(eventId)
        .subscribe(
            () => {
                console.log('Réservation créée avec succès pour l\'événement avec l\'ID', eventId);
                // Afficher un message de succès
                Swal.fire({
                    icon: 'success',
                    title: 'Réservation effectuée!',
                    text: 'Votre réservation a été effectuée avec succès.',
                    confirmButtonText: 'OK'
                });
            },
            error => {
                console.error('Erreur lors de la réservation pour l\'événement avec l\'ID', eventId, ':', error);
                // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Il n\'y a plus de places disponibles  ',
                    confirmButtonText: 'OK'
                });
            }
        );
}


  
}
