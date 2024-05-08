import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  Api_Path = "http://localhost:8083";
  public getUsers(): Observable<any[]> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    console.log(headers)
    return this.http.get<any[]>(this.Api_Path + '/api/v1/user/all', { headers: headers  });
  }
}
