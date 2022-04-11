import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private addProjectURL = "http://localhost:3000/add-project";
  constructor(private http: HttpClient, private router: Router) { }

  addProject(project:{}){
    return this.http.post<any>(this.addProjectURL,project);
  }
}
