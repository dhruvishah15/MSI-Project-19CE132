import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { CanActivate, Router } from '@angular/router';
import { CustomValidators } from 'src/app/providers/custom-validators';

export interface Privilege {
  key: number;
  privilegeValue: string;
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})

export class UserRegistrationComponent implements OnInit {

  name = "User Registration Component";
  registrationForm: FormGroup;
  hide = true;
  message: any;
  showError: boolean = false;

  privileges: Privilege[] = [
    {key: 1, privilegeValue: '1'},
    {key: 2, privilegeValue: '2'}
  ];

  priv: any = [1, 2];
  changePrivilege(e: any) {
    this.priv?.setValue(e.target.value, { onlySelf: true });
  }

  constructor(private router: Router, private fb: FormBuilder, private userService : UserService) { 
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.compose([Validators.required])],
      privilege: ['',Validators.required]
    },
    {
      // check whether our password and confirm password match
      validator: CustomValidators.passwordMatchValidator
    }
    );
  }

  onSubmit() {
    const {name,email,password,privilege} = this.registrationForm.value;
    this.userService.registerUser({name,email,password,privilege}).subscribe(
      resp => {
        console.log(JSON.stringify(this.registrationForm.value));
      },
      err =>{ 
        this.showError = true;
        this.message = err.error.message;
        console.log(err.error.message);
      }
    )
    // this.registrationForm.reset();
  }

  onClear() {
    this.registrationForm.reset();
  }

  ngOnInit(): void {
    
  }

  reloadCurrentPage() {
    window.location.reload();
  }

}
