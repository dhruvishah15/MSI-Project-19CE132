import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService : AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    const {email,password} = this.loginForm.value;
    this.authService.loginUser({email,password}).subscribe(
      res => {
        this.authService.setToken(res.token);
        this.router.navigate(["/usermanagement"]);
      },
      err =>{ 
        console.log(err.error.message);
      }
    )
  }

  onClear() {
    this.loginForm.reset();
  }

  ngOnInit(): void {
    console.log("Login Form");
  }


}
