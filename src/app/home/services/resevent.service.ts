import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservationUrl = 'http://localhost:8083/resEvents/';

  constructor(private http: HttpClient) { }

  getAllReservations(): Observable<any[]> {
    const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<any[]>(this.reservationUrl,{headers});
  }

  addReservation(eventId: number): Observable<any> {
    const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<any>(this.reservationUrl, eventId,{headers});
  }
  
  createReservation(eventId: any): Observable<any> {
    const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<any>(`${this.reservationUrl,{headers}}`, { evenementId: eventId });
  }

  
}
