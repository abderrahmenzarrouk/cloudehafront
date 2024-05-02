import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from 'src/models/item.model';
import { Commentaire } from 'src/models/commentaire.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private baseUrl = 'http://localhost:8088/items';

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl + '/retrive-all');
  }

  addItem(itemData: any): Observable<any> {
    const formData = new FormData();
    formData.append('nom', itemData.nom);
    formData.append('description', itemData.description);
    formData.append('nombreDePoints', itemData.nombreDePoints);
    formData.append('typeItem', itemData.typeItem);
    formData.append('image', itemData.image); // Assurez-vous que 'image' est le même nom que vous utilisez dans votre backend pour récupérer le fichier
  
    return this.http.post(this.baseUrl + '/add-item', formData);
  }
  deleteItem(itemId: number): Observable<any> {
    const url = `${this.baseUrl}/delete-item/${itemId}`;
    return this.http.delete(url,{ responseType: 'json' });
  }
  getAllCommentairesByItemId(itemId: number): Observable<Commentaire[]> {
    const url = `${this.baseUrl}/${itemId}/getcommentaires`;
    return this.http.get<Commentaire[]>(url);
  }
getItemById(id: number): Observable<Item> {
  return this.http.get<Item>(`${this.baseUrl}/${id}`);
}
updateItem(id: number, newItem: any): Observable<any> {
  const url = `${this.baseUrl}/${id}`;
  return this.http.put(url, newItem);
}
searchItems(query: string): Observable<Item[]> {
  let params = { query: query };
  return this.http.get<Item[]>(`${this.baseUrl}/search`, { params: params });
}

}




