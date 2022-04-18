import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElementRef, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';

import {map, startWith} from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';



export interface Status {
  key: boolean;
  statusValue: string;
}

@Component({
  selector: 'app-update-project-mapping-data',
  templateUrl: './update-project-mapping-data.component.html',
  styleUrls: ['./update-project-mapping-data.component.css']
})

export class UpdateProjectMappingDataComponent implements OnInit {

  hide = true;
  message: any;
  showError: boolean = false;
  success: boolean = false;
  projectId: any;
  projectDetails: any;
  dataLoaded: boolean=false;
  updateProjectForm: FormGroup;

  @ViewChild('userInput',{static: true}) userInput: ElementRef;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredUsers: Observable<string[]>;
  users: string[] = ['Admin'];
  allUsers: string[] = ['Admin','User1', 'User2', 'User3', 'User4', 'User5'];

  status: Status[] = [
    {key: true, statusValue: 'Active'},
    {key: false, statusValue: 'Not Active'}
  ];



  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private projectService : ProjectService) {
    this.updateProjectForm = this.formBuilder.group({
      'projectname': ['', Validators.required],
      'deptcode': [''],
      'users': [''],
      'product': [''],
      'status': [''],
      'cieareaid': [''],
      'financeproductid': ['']
    });

    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => (user ? this._filter(user) : this.allUsers.slice())),
    );

  }
  
  ngOnInit(): void {
    this.dataLoaded = false;
    
    this.projectId = this.activatedRoute.snapshot.paramMap.get('id');

    if(this.projectId !== ''){
      this.projectService.viewSingleProject(this.projectId)
      .toPromise()
      .then(data => {
          this.projectDetails = data;
          console.log("Hello");
          console.log(this.projectDetails);
          this.dataLoaded = true;

      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  updateProject(){
    this.updateProjectForm.controls['users'].setValue(this.users);
    let {projectname, deptcode, product, users, status, cieareaid, financeproductid } = this.updateProjectForm.value;
    const projectId = this.activatedRoute.snapshot.paramMap.get('id');
    this.projectService.updateProject(projectId,{projectname, deptcode, product, users, status, cieareaid, financeproductid } ).subscribe(
      res => {
        this.message = "Project Updated Successfully";
        this.success = true;
        console.log(res);
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
    //this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allUsers.filter(user => user.toLowerCase().includes(filterValue));
  }
}
