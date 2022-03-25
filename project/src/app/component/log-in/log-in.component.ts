import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit{

  loginForm: FormGroup;
  hide = true;
  message: any;
  showError: boolean = false;

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
        this.authService.setPrivilege(res.privilege);
        let priv = this.authService.getPrivilege();
        if(priv == "1"){
          this.router.navigate(["/admin-dashboard"]);
        }else if(priv == "2"){
          this.router.navigate(["/user-dashboard"])
        }   
      },
      err =>{ 
        this.showError = true;
        this.message = err.error.message;
        console.log(err.error.message);
      }
    )
  }

  reloadCurrentPage() {
    window.location.reload();
  }

  // onClear() {
  //   this.loginForm.reset();
  // }

  ngOnInit(): void {
    console.log("Login Form");
  }

}
