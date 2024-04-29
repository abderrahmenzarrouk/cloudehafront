import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/home/services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-event',
  templateUrl: './ajouter-event.component.html',
  styleUrls: ['./ajouter-event.component.css']
})
export class AjouterEventComponent {
  constructor(private router: Router, private evenementService: EventService) { }

  register(registerForm: NgForm) {
    if (registerForm.valid) {
      const evenement: any = {
        nom_event: registerForm.value.nom_event,
        date_debut: registerForm.value.date_debut,
        date_fin: registerForm.value.date_fin,
        placesDispo: registerForm.value.placesDispo,
        placesRestants: registerForm.value.placesRestants
      };

      this.evenementService.saveEvent(evenement).subscribe(
        (savedEvent: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Événement ajouté avec succès',
            showConfirmButton: false,
            timer: 2500
          }).then(() => {
            this.router.navigate(['/back/events/events']);
          });
        },
        (error: any) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur lors de l\'ajout de l\'événement',
            text: 'Une erreur s\'est produite lors de l\'ajout de l\'événement. Veuillez réessayer plus tard.',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }

}
