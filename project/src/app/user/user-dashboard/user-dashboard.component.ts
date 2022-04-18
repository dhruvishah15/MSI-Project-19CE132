import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
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
