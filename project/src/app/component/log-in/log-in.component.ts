import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassLoginDataService } from '../../pass-login-data.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup;
  pass_data: any = [];
  data: any = [];

  constructor(private fb: FormBuilder, private myService: PassLoginDataService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
    this.data = myService.getData();
  }

  onSubmit() {
    const obj = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.branch
    };
    this.pass_data.push(obj);
    this.myService.setData(this.pass_data);
    localStorage.setItem('dataSource', JSON.stringify(this.pass_data));
    console.log(this.myService.getData());
    // JSON.parse(localStorage.getItem('dataSource'));
    this.loginForm.reset();
  }

  onClear() {
    this.loginForm.reset();
  }

  ngOnInit(): void {
    console.log("Login Form");
  }


}
