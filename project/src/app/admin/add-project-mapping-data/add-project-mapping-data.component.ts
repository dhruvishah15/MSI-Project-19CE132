import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElementRef, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';

export interface Status {
  key: boolean;
  statusValue: string;
}

@Component({
  selector: 'app-add-project-mapping-data',
  templateUrl: './add-project-mapping-data.component.html',
  styleUrls: ['./add-project-mapping-data.component.css']
})

export class AddProjectMappingDataComponent implements OnInit {

  addProjectForm: FormGroup;
  hide = true;
  message: any;
  showError: boolean = false;
  success: boolean = false;

  ngOnInit(): void {
  }

  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredUsers: Observable<string[]>;
  users: string[] = [];
  allUsers: string[] = ['Admin','User1', 'User2', 'User3', 'User4', 'User5'];

  status: Status[] = [
    {key: true, statusValue: 'Active'},
    {key: false, statusValue: 'Not Active'}
  ];


  @ViewChild('userInput',{static: true}) userInput: ElementRef;

  constructor(private router: Router, private fb: FormBuilder, private projectService : ProjectService) {
    this.addProjectForm = this.fb.group({
      projectName: ['', Validators.required],
      deptCode: ['', Validators.required],
      product: ['', Validators.required],
      status: ['',Validators.required],
      users: ['',Validators.required],
      cieAreaId: ['',Validators.required],
      financeProductId: ['',Validators.required],
    },)

    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => (user ? this._filter(user) : this.allUsers.slice())),
    );
  }

  onSubmit(){
    this.addProjectForm.controls['users'].setValue(this.users);
    let {projectName,deptCode,users,product,status,cieAreaId,financeProductId} = this.addProjectForm.value;
    console.log(users);
    
    this.projectService.addProject({projectName,deptCode,users,product,status,cieAreaId,financeProductId}).subscribe(
      resp => {
        this.success = true;
        this.message = "Project Details Added Succesfully"
        console.log(JSON.stringify(this.addProjectForm.value));
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

  stat: any= [true, false];
  changeStatus(e: any) {
    this.stat?.setValue(e.target.value, { onlySelf: true });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our user
    if (value) {
      this.users.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.userCtrl.setValue(null);
  }

  remove(user: string): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
    
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.users.push(event.option.viewValue);
    // this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allUsers.filter(user => user.toLowerCase().includes(filterValue));
  }

}
