import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  platId!: number;


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

   private baseUrl = 'http://localhost:8083/items';

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<any[]> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<any[]>(this.baseUrl + '/retrive-all',{ headers });
  }

  addItem(itemData: any): Observable<any> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const formData = new FormData();
    formData.append('nom', itemData.nom);
    formData.append('description', itemData.description);
    formData.append('nombreDePoints', itemData.nombreDePoints);
    formData.append('typeItem', itemData.typeItem);
    formData.append('image', itemData.image); // Assurez-vous que 'image' est le même nom que vous utilisez dans votre backend pour récupérer le fichier
    formData.append('mode', itemData.mode); // Ajoutez le mode ici


    if (itemData.documentation) {
      formData.append('documentationFile', itemData.documentation);
    }
    
  
    return this.http.post(this.baseUrl + '/add-item', formData, { headers });
  }

  deleteItem(itemId: number): Observable<any> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const url = "http://localhost:8083/items/delete-item/"+itemId;
    return this.http.delete(url,{headers});
  }
  getItemById(id: number): Observable<any> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<any>("http://localhost:8083/items/"+id,{headers});
  }

  updateItem(id: number, newItem: any): Observable<any> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const url = "http://localhost:8083/items/"+id;
    return this.http.put(url, newItem,{headers});
  }
  updateItemNote(itemId: number, note: number): Observable<any> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const url = "http://localhost:8083/items/"+itemId+"/note";
    return this.http.put<any>(url, note,{headers}); // Envoyer directement le nombre sans enveloppe d'objet
  }


}
