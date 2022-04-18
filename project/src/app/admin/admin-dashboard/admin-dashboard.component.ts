import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {
  name: any;
  email: any;
  constructor(private authService: AuthService){}

  ngOnInit() {
    this.name = sessionStorage.getItem('name');
    this.email = sessionStorage.getItem('email');
  }
  
  logOut(){
    this.authService.logout();
  }
}


