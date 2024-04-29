import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/home/services/event.service';
import Swal from 'sweetalert2';

interface AnnonceData {
  nom_event: string;
  date_debut: Date;
  date_fin: Date;
  placesDispo: number;
  placesRestants: number;
}

interface Annonce {
  nom_event: string;
  date_debut: Date;
  date_fin: Date;
  placesDispo: number;
  placesRestants: number;
  image: string;
}

@Component({
  selector: 'app-ajouter-event',
  templateUrl: './ajouter-event.component.html',
  styleUrls: ['./ajouter-event.component.css']
})
export class AjouterEventComponent implements OnInit {
  annonceForm!: FormGroup;
  annoncePayload: AnnonceData = {
    nom_event: "",
    date_debut: new Date(),
    date_fin: new Date(),
    placesDispo: 0,
    placesRestants: 0,
  };
  error: string | null = null;
  annonceSubmitted: boolean = false;
  selectedFile: File | null = null;

  constructor(private formBuilder: FormBuilder, private router: Router, private eventService: EventService) {}

  ngOnInit(): void {
    this.annonceSubmitted = false;
    this.annonceForm = this.formBuilder.group({
      nom_event: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      placesDispo: ['', Validators.required],
      placesRestants: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  insertEvent(): void {
    if (this.annonceForm.valid && this.selectedFile) {
      const formData = new FormData();

      formData.append('file', this.selectedFile);
      formData.append('nom_event', this.annonceForm.get('nom_event')?.value);
      formData.append('date_debut', this.annonceForm.get('date_debut')?.value);
      formData.append('date_fin', this.annonceForm.get('date_fin')?.value);
      formData.append('placesDispo', this.annonceForm.get('placesDispo')?.value);
      formData.append('placesRestants', this.annonceForm.get('placesRestants')?.value);

      this.eventService.uploadImage(this.selectedFile).subscribe(
        (imageResponse: any) => {
          const annonce: Annonce = {
            nom_event: formData.get('nom_event') as string,
            date_debut: formData.get('date_debut') as unknown as Date,
            date_fin: formData.get('date_fin') as unknown as Date,
            placesDispo: Number(formData.get('placesDispo')),
            placesRestants: Number(formData.get('placesRestants')),
            image: imageResponse.downloadURL
          };

          this.eventService.saveEvent(annonce).subscribe(
            annonceResponse => {
              console.log('Annonce créée:', annonceResponse);
              this.annonceForm.reset();
              Swal.fire({
                icon: 'success',
                title: 'Événement ajouté avec succès',
                showConfirmButton: false,
                timer: 2500
              }).then(() => {
                this.router.navigate(['/back/events/events']);
              });
            },
            error => {
              console.error('Erreur lors de la création de l\'annonce:', error);
              Swal.fire({
                icon: 'error',
                title: 'Erreur lors de l\'ajout de l\'événement',
                text: 'Une erreur s\'est produite lors de l\'ajout de l\'événement. Veuillez réessayer plus tard.',
                confirmButtonText: 'OK'
              });
            }
          );
        },
        error => {
          console.error('Erreur lors du téléchargement de l\'image:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur lors du téléchargement de l\'image',
            text: 'Une erreur s\'est produite lors du téléchargement de l\'image. Veuillez réessayer plus tard.',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }

  handleFileInput(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
}
