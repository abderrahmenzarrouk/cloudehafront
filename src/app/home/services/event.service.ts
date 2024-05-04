import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl1 = 'http://localhost:8083/resEvents/';
  private baseUrl = 'http://localhost:8083/events/';
  private boredApiUrl = 'https://www.boredapi.com/api/activity';

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<any[]> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<any[]>(this.baseUrl,{ headers });
  }

  deleteEvent(id: any): Observable<void> {
    const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const url = `${this.baseUrl}${id}`;
    return this.http.delete<void>(url,{headers});
  }

  saveEvent(event: any): Observable<any> {
    const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<any>(this.baseUrl, event,{headers});
  }

  uploadImage(file: any): Observable<any> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>('http://localhost:8083/upload', formData,{headers});
  }


  getRandomEventInCategory(category: string): Observable<any> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const url = `${this.boredApiUrl}?type=${category}`;
    return this.http.get<any>(url);
  }
  // Modifier cette méthode pour utiliser l'URL correcte
  getReservationsForEvent(eventId: number): Observable<any[]> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    
    return this.http.get<any[]>(`${this.baseUrl1}event/${eventId}`,{headers});
  }

  
}
