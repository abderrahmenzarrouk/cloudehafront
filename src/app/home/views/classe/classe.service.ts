import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private BASIC_URL = "http://localhost:8083/PI/classes/"; // URL de base de l'API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer toutes les classes depuis le serveur
  getAllClasses(): Observable<any> {
    return this.http.get<any[]>(this.BASIC_URL + "getAllClasses"); // Requête GET vers l'endpoint approprié
  }

  getClasseById(id:number): Observable<any> {
  return this.http.get<any[]>(this.BASIC_URL + "getClassById/{idClasse}"); // Requête GET vers l'endpoint approprié
}

updateClasse(id:number,classe:any): Observable<any> {
  return this.http.get<any[]>(this.BASIC_URL + "classe/{idClasse}"); 
}

deleteClasse(id:number): Observable<any> {
  return this.http.delete<any[]>(this.BASIC_URL + "delete-classe/"+id); 

}
getAllressources(): Observable<any> {

  return this.http.get<any[]>("http://localhost:8083/PI/ressources/getAllRessources"); 
}

getClasseRessources(id:number): Observable<any> {
  return this.http.get<any[]>("http://localhost:8083/PI/ressources/getClasseRessources/"+id); // Requête GET vers l'endpoint approprié

}
}
