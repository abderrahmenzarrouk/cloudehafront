import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
  Api_Path = "http://localhost:8083";

  public login(loginData: any){
    return this.http.post(this.Api_Path + "/api/v1/auth/authenticate",loginData);
  }
  setUser(user: any) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
  private readonly userKey = 'user';
  getUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  clearUser() {
    localStorage.removeItem(this.userKey);
  }
  public setToken(jwtToken : string){
    localStorage.setItem("jwtToken",jwtToken)
  }
  public setRoles(role : any){
    localStorage.setItem("roles",JSON.stringify(role))
  }
}
