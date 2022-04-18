import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  private addProjectURL = "http://localhost:3000/add-project";
  private viewProjectURL = "http://localhost:3000/view-project";
  private viewSingleProjectURL = "http://localhost:3000/view-single-project/";
  private deleteProjectURL = "http://localhost:3000/delete-project/";
  private updateProjectURL = "http://localhost:3000/update-project/";
  private exportProjectURL = "http://localhost:3000/export";
  private SERVER_URL = "http://localhost:3000/upload";
  constructor(private http: HttpClient, private router: Router) { }

  addProject(project:{}){
    return this.http.post<any>(this.addProjectURL,project);
  }

  viewProject(){
    return this.http.get<any>(this.viewProjectURL);
  }

  viewSingleProject(id: any){
    return this.http.get<any>(this.viewSingleProjectURL + id);
  }

  deleteProject(id: any){
    return this.http.delete(this.deleteProjectURL + id);
  }

  updateProject(id: any, projectObj: any){
    return this.http.put<any>(this.updateProjectURL+id, projectObj);
  }

  exportProject(){
    return this.http.get<any>(this.exportProjectURL);
  }
  
  importProject(formData: any){
    return this.http.post<any>(this.SERVER_URL, formData);
  }

}
