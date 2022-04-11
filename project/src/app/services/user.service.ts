import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registrationURL = "http://localhost:3000/user-registration";
  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user:{}){
    return this.http.post<any>(this.registrationURL,user);
  }
}
