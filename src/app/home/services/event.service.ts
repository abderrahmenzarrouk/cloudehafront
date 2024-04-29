import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = 'http://localhost:8083/events/';

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  deleteEvent(id: any): Observable<void> {
    const url = `${this.baseUrl}${id}`;
    return this.http.delete<void>(url);
  }

  saveEvent(event: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, event);
  }
  
}
