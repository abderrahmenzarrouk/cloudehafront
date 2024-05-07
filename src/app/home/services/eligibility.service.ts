import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EligibilityService {
  private baseUrl="http://localhost:8083/eligibilite"

  constructor(private http: HttpClient) {
  }
  getAllElig(): Observable<any[]> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<any[]>(this.baseUrl,{ headers });
  }

  saveEvent(elig: any): Observable<any> {
    const token = localStorage.getItem('Token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<any>(this.baseUrl, elig,{headers});
  }

}
