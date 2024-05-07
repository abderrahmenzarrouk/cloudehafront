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
    return this.http.get<any[]>(this.reservationUrl, { headers });
  }
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  addReservation(eventId: number, quantity: number): Observable<any> {
    console.log("here1")
    console.log(this.userconnect.id)
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    // Ajout de la quantité comme corps de la requête
    console.log({ "evenementId":eventId,"quantity": quantity,"userid":this.userconnect.id})
    return this.http.post<any>(this.reservationUrl, { "evenementId":eventId,"quantity": quantity,"iduser":this.userconnect.id}, { headers });
  }
}
