import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registrationURL = "http://localhost:3000/user-registration";
  private viewUsersURL = "http://localhost:3000/view-users";
  private deleteUserURL = "http://localhost:3000/delete-user/";
  constructor(private http: HttpClient, private router: Router) { }
  
  isLoggedInName()
  {
    let name = sessionStorage.getItem("name");
    return name;
  }

  isLoggedInEmail()
  {
    let email = sessionStorage.getItem("email");
    return email;
  }

  registerUser(user:{}){
    return this.http.post<any>(this.registrationURL,user);
  }

  viewUsers(){
    return this.http.get<any>(this.viewUsersURL);
  }

  deleteUser(id: any){
    return this.http.delete(this.deleteUserURL + id);
  }
  
}
