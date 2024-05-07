import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasseServiceService {

  private BASIC_URL = "http://localhost:8083/classes/"; // URL de base de l'API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer toutes les classes depuis le serveur
  getAllClasses(): Observable<any> 
  {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<any[]>(this.BASIC_URL + "getAllClasses",{headers}); // Requête GET vers l'endpoint approprié
  }

  getClasseById(id:number): Observable<any> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  return this.http.get<any[]>(this.BASIC_URL + "getClassById/{idClasse}",{headers}); // Requête GET vers l'endpoint approprié
}

updateClasse(id:number,classe:any): Observable<any> {
  const token = localStorage.getItem('Token');
  const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  return this.http.get<any[]>(this.BASIC_URL + "classe/{idClasse}",{headers}); 
}

deleteClasse(id:number): Observable<any> {
  const token = localStorage.getItem('Token');
  const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  return this.http.delete<any[]>(this.BASIC_URL + "delete-classe/"+id,{headers}); 

}
getAllressources(): Observable<any> {
  const token = localStorage.getItem('Token');
  const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  return this.http.get<any[]>("http://localhost:8083/ressources/getAllRessources",{headers}); 
}

getClasseRessources(id:number): Observable<any> {
  const token = localStorage.getItem('Token');
  const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  return this.http.get<any[]>("http://localhost:8083/ressources/getClasseRessources/"+id,{headers}); // Requête GET vers l'endpoint approprié

}
}
