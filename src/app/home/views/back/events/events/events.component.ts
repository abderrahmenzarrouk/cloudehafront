import { EventService } from './../../../../services/event.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  
  events: any[] | undefined;
  showAddForm: boolean = false;

  constructor(private es: EventService) { }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents(): void {
    this.es.getAllEvents()
      .subscribe(
        (data: any[]) => {
          this.events = data;
        },
        error => {
          console.error('Une erreur s\'est produite lors de la récupération des événements:', error);
        }
      );
  }
  deleteEvent(id: any) {
    this.es.deleteEvent(id).subscribe(
      () => {
        console.log("Événement supprimé");
        // Reloading the page inside the subscribe block ensures that it will happen after the deletion is successful
        window.location.reload();
      },
      error => {
        console.error("Erreur lors de la suppression de l'événement:", error);
        // You can handle the error here, such as displaying an error message
      }
    );
  }



  
 
}
