import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private loginURL = "http://localhost:3000/login";
  constructor(private http: HttpClient) { }

  loginUser(user:{}){
    return this.http.post<any>(this.loginURL,user);
  }

  logout(){
    sessionStorage.removeItem("token");
  }

  isLoggedIn(){
    return !!sessionStorage.getItem("token");
  }

  setToken(token:string){
    sessionStorage.setItem("token",token);
  }
  
  getToken(){
    return sessionStorage.getItem("token");
  }

  setPrivilege(privilege:string){
    return sessionStorage.setItem("privilege",privilege);
  }

  getPrivilege(){
    return sessionStorage.getItem("privilege");
  }
}
