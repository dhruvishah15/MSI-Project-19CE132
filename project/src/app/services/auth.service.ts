import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private loginURL = "http://localhost:3000/login";
  constructor(private http: HttpClient, private router: Router) { }

  loginUser(user:{}){
    return this.http.post<any>(this.loginURL,user);
  }

  isLoggedIn(){
    return sessionStorage.getItem("token") != null;;
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

  setName(name:string){
    return sessionStorage.setItem("name",name);
  }

  getName(){
    return sessionStorage.getItem("name");
  }

  setEmail(email:string){
    return sessionStorage.setItem("email",email);
  }

  getEmail(){
    return sessionStorage.getItem("email");
  }


  logout(){
    sessionStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

}
