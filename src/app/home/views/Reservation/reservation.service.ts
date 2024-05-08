import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8083/PI'; // Assurez-vous que c'est l'URL correcte de votre API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les statistiques de réservation
  getReservationStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/reservations/statistiques`);
  }
}
